"use server";

import { z } from "zod";
import {
  MailerSend,
  EmailParams,
  Sender,
  Recipient,
  Attachment,
} from "mailersend";
import mailchimp from "@mailchimp/mailchimp_marketing";

import { GetScoutedFormSchema, NewsletterFormSchema } from "@/lib/schema";
import { writeClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

type GetScoutedFormInputs = Omit<
  z.infer<typeof GetScoutedFormSchema>,
  "headshot" | "profileHeadshot" | "halfBodyShot" | "fullBodyShot"
> & {
  headshot: File;
  profileHeadshot: File;
  halfBodyShot: File;
  fullBodyShot: File;
};

type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>;

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_TOKEN!,
});

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const submitGetScoutedForm = async (formData: FormData) => {
  const data: GetScoutedFormInputs = {
    ...JSON.parse(formData.get("data") as string),
    headshot: formData.get("headshot"),
    profileHeadshot: formData.get("profileHeadshot"),
    halfBodyShot: formData.get("halfBodyShot"),
    fullBodyShot: formData.get("fullBodyShot"),
  };

  const result = GetScoutedFormSchema.safeParse(data);

  if (!result.success) return { success: false };

  try {
    // Upload assets to Sanity
    const headshotDocument = await writeClient.assets.upload(
      "image",
      data.headshot,
    );
    const profileHeadshotDocument = await writeClient.assets.upload(
      "image",
      data.profileHeadshot,
    );
    const halfBodyShotDocument = await writeClient.assets.upload(
      "image",
      data.halfBodyShot,
    );
    const fullBodyShotDocument = await writeClient.assets.upload(
      "image",
      data.fullBodyShot,
    );

    // Create new Sanity document
    const doc: NewApplicationDoc = {
      _type: "application",
      fullName: `${data.firstName} ${data.lastName}`,
      gender: data.gender,
      birthday: data.birthday,
      email: data.email,
      phone: data.phone,
      height: data.height,
      location: data.countryCity,
      instagram: data.instagram,
      headshot: {
        _type: "image",
        asset: { _type: "reference", _ref: headshotDocument._id },
      },
      profileHeadshot: {
        _type: "image",
        asset: { _type: "reference", _ref: profileHeadshotDocument._id },
      },
      halfBodyShot: {
        _type: "image",
        asset: { _type: "reference", _ref: halfBodyShotDocument._id },
      },
      fullBodyShot: {
        _type: "image",
        asset: { _type: "reference", _ref: fullBodyShotDocument._id },
      },
    };

    // Save document to Sanity
    await writeClient.create(doc);

    const getScoutedTagId = await ensureMediaTag("origin:get-scouted");

    const fullNameSlug = slugify(doc.fullName);
    const appTagId = await ensureMediaTag(`application:${fullNameSlug}`);

    await tagAssetWithMediaTags(headshotDocument._id, [
      getScoutedTagId,
      appTagId,
    ]);
    await tagAssetWithMediaTags(profileHeadshotDocument._id, [
      getScoutedTagId,
      appTagId,
    ]);
    await tagAssetWithMediaTags(halfBodyShotDocument._id, [
      getScoutedTagId,
      appTagId,
    ]);
    await tagAssetWithMediaTags(fullBodyShotDocument._id, [
      getScoutedTagId,
      appTagId,
    ]);

    // Create buffers from files
    const headshotArrBuff = await data.headshot.arrayBuffer();
    const profileHeadshotArrBuff = await data.profileHeadshot.arrayBuffer();
    const halfBodyShotArrBuff = await data.halfBodyShot.arrayBuffer();
    const fullBodyShotArrBuff = await data.fullBodyShot.arrayBuffer();

    // Create a MailerSend message
    const sentFrom = new Sender(
      process.env.MAILERSEND_SENDER_IDENTITY!,
      `${data.firstName} ${data.lastName}`,
    );

    const recipients = [new Recipient(process.env.MAILERSEND_RECIPIENT!)];

    const attachments = [
      new Attachment(
        Buffer.from(headshotArrBuff).toString("base64"),
        data.headshot.name,
        "attachment",
      ),
      new Attachment(
        Buffer.from(profileHeadshotArrBuff).toString("base64"),
        data.profileHeadshot.name,
        "attachment",
      ),
      new Attachment(
        Buffer.from(halfBodyShotArrBuff).toString("base64"),
        data.halfBodyShot.name,
        "attachment",
      ),
      new Attachment(
        Buffer.from(fullBodyShotArrBuff).toString("base64"),
        data.fullBodyShot.name,
        "attachment",
      ),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(
        new Recipient(data.email, `${data.firstName} ${data.lastName}`),
      )
      .setAttachments(attachments)
      .setSubject("GET SCOUTED - LEGION MODEL MANAGEMENT").setHtml(`
        <div>
          <p>FULL NAME: ${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}</p>
          <p>DATE OF BIRTH: ${data.birthday.toUpperCase()}</p>
          <p>E-MAIL: ${data.email.toUpperCase()}</p>
          <p>PHONE: ${data.phone.toUpperCase()}</p>
          <p>HEIGHT: ${data.height.toUpperCase()}</p>
          <p>LOCATION: ${data.countryCity.toUpperCase()}</p>
          <p>INSTAGRAM: ${data.instagram.toUpperCase()}</p>
        </div>
      `);

    // Send message with MailerSend
    await mailerSend.email.send(emailParams);

    return { success: true };
  } catch (error) {
    console.log("Something went wrong.", error);
    return { success: false };
  }
};

export const submitNewsletterForm = async (data: NewsletterFormInputs) => {
  const result = NewsletterFormSchema.safeParse(data);

  if (!result.success) return { success: false };

  try {
    const listId = process.env.MAILCHIMP_AUDIENCE_ID!;
    const subscribingUser = { firstName: data.firstName, email: data.email };

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "pending",
      merge_fields: { FNAME: subscribingUser.firstName },
    });

    return { success: true, status: response.status };
  } catch (error) {
    console.log("Something went wrong.", error);
    return { success: false };
  }
};

export const shareCollectionWithEmail: (
  collection: CollectionDoc,
  email: string,
) => Promise<{ success: boolean }> = async (collection, email) => {
  const sentFrom = new Sender(
    process.env.MAILERSEND_SENDER_IDENTITY!,
    "LEGION MODEL MANAGEMENT",
  );

  const recipients = [new Recipient(email)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(new Recipient(process.env.MAILERSEND_RECIPIENT!))
    .setSubject(collection.name)
    .setHtml(`<a href="${collection.share}">Open package</a>`);

  try {
    await mailerSend.email.send(emailParams);

    return { success: true };
  } catch (error) {
    console.log("Something went wrong.", error);
    return { success: false };
  }
};

async function ensureMediaTag(slug: string) {
  const query = groq`
    *[_type =="media.tag" && name.current == $slug][0] {
      _id
    }
  `;

  const existing = await writeClient.fetch(query, { slug });

  if (existing?._id) {
    return existing._id;
  }

  const newTag = await writeClient.create({
    _type: "media.tag",
    title: slug,
    name: { _type: "slug", current: slug },
  });

  return newTag._id;
}

async function tagAssetWithMediaTags(assetId: string, tagIds: string[]) {
  const tagRefs = tagIds.map((id) => ({
    _type: "reference",
    _ref: id,
    _weak: true,
  }));

  await writeClient
    .patch(assetId)
    .setIfMissing({ opt: { media: { tags: [] } } })
    .append("opt.media.tags", tagRefs)
    .commit();
}

function slugify(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}
