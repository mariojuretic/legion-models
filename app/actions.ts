"use server";

import { z } from "zod";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

import { GetScoutedFormSchema } from "@/lib/schema";

type GetScoutedFormInputs = Omit<
  z.infer<typeof GetScoutedFormSchema>,
  "headshot" | "profileHeadshot" | "halfBodyShot" | "fullBodyShot"
> & {
  headshot: File;
  profileHeadshot: File;
  halfBodyShot: File;
  fullBodyShot: File;
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const submitGetScoutedForm = async (formData: FormData) => {
  const data: GetScoutedFormInputs = {
    ...JSON.parse(formData.get("data") as string),
    headshot: formData.get("headshot"),
    profileHeadshot: formData.get("profileHeadshot"),
    halfBodyShot: formData.get("halfBodyShot"),
    fullBodyShot: formData.get("fullBodyShot"),
  };

  const result = GetScoutedFormSchema.safeParse(data);

  if (!result.success) return result;

  try {
    const headshotArrBuff = await data.headshot.arrayBuffer();
    const profileHeadshotArrBuff = await data.profileHeadshot.arrayBuffer();
    const halfBodyShotArrBuff = await data.halfBodyShot.arrayBuffer();
    const fullBodyShotArrBuff = await data.fullBodyShot.arrayBuffer();

    const msg: MailDataRequired = {
      to: "mario@weblio.hr",
      from: `${data.firstName} ${data.lastName} <sendgrid@em3332.weblio.hr>`,
      replyTo: `${data.firstName} ${data.lastName} <${data.email}>`,
      subject: "Scouting application - LEGION Model Management",
      html: `
        <div>
          <p>Full Name: ${data.firstName} ${data.lastName}</p>
          <p>Date of Birth: ${data.birthday}</p>
          <p>E-mail: ${data.email}</p>
          <p>Height: ${data.height}</p>
          <p>Location: ${data.countryCity}</p>
          <p>Instagram: ${data.instagram}</p>
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

    await sgMail.send(msg);
    return result;
  } catch (error) {
    console.log("Something went wrong.", error);
    return { success: false };
  }
};
