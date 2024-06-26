"use server";

import { z } from "zod";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import mailchimp from "@mailchimp/mailchimp_marketing";

import { GetScoutedFormSchema, NewsletterFormSchema } from "@/lib/schema";
import { writeClient } from "@/lib/sanity.client";

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

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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
        asset: {
          _type: "reference",
          _ref: headshotDocument._id,
        },
      },
      profileHeadshot: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: profileHeadshotDocument._id,
        },
      },
      halfBodyShot: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: halfBodyShotDocument._id,
        },
      },
      fullBodyShot: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: fullBodyShotDocument._id,
        },
      },
    };

    // Save document to Sanity
    await writeClient.create(doc);

    // Create buffers from files
    const headshotArrBuff = await data.headshot.arrayBuffer();
    const profileHeadshotArrBuff = await data.profileHeadshot.arrayBuffer();
    const halfBodyShotArrBuff = await data.halfBodyShot.arrayBuffer();
    const fullBodyShotArrBuff = await data.fullBodyShot.arrayBuffer();

    // Create a Sendgrid message
    const msg: MailDataRequired = {
      to: process.env.SENDGRID_RECIPIENT,
      from: `${data.firstName} ${data.lastName} <${process.env.SENDGRID_SENDER_IDENTITY}>`,
      replyTo: `${data.firstName} ${data.lastName} <${data.email}>`,
      subject: "GET SCOUTED - LEGION MODEL MANAGEMENT",
      html: `
        <div>
          <p>FULL NAME: ${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}</p>
          <p>DATE OF BIRTH: ${data.birthday.toUpperCase()}</p>
          <p>E-MAIL: ${data.email.toUpperCase()}</p>
          <p>PHONE: ${data.phone.toUpperCase()}</p>
          <p>HEIGHT: ${data.height.toUpperCase()}</p>
          <p>LOCATION: ${data.countryCity.toUpperCase()}</p>
          <p>INSTAGRAM: ${data.instagram.toUpperCase()}</p>
        </div>
      `,
      attachments: [
        {
          content: Buffer.from(headshotArrBuff).toString("base64"),
          filename: data.headshot.name,
          type: data.headshot.type,
          disposition: "attachment",
        },
        {
          content: Buffer.from(profileHeadshotArrBuff).toString("base64"),
          filename: data.profileHeadshot.name,
          type: data.profileHeadshot.type,
          disposition: "attachment",
        },
        {
          content: Buffer.from(halfBodyShotArrBuff).toString("base64"),
          filename: data.halfBodyShot.name,
          type: data.halfBodyShot.type,
          disposition: "attachment",
        },
        {
          content: Buffer.from(fullBodyShotArrBuff).toString("base64"),
          filename: data.fullBodyShot.name,
          type: data.fullBodyShot.type,
          disposition: "attachment",
        },
      ],
    };

    // Send message with Sendgrid
    await sgMail.send(msg);
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
    const subscribingUser = {
      firstName: data.firstName,
      email: data.email,
    };

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "pending",
      merge_fields: {
        FNAME: subscribingUser.firstName,
      },
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
  const msg: MailDataRequired = {
    to: email,
    from: `Legion Model Management <${process.env.SENDGRID_SENDER_IDENTITY}>`,
    replyTo: process.env.SENDGRID_RECIPIENT,
    subject: collection.name,
    html: `<a href="${collection.share}">Open package</a>`,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.log("Something went wrong.", error);
    return { success: false };
  }
};
