"use server";

import { z } from "zod";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

import { GetScoutedFormSchema } from "@/lib/schema";

type GetScoutedFormInputs = z.infer<typeof GetScoutedFormSchema>;

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const submitGetScoutedForm = async (data: GetScoutedFormInputs) => {
  const result = GetScoutedFormSchema.safeParse(data);

  if (!result.success) return result;

  const msg: MailDataRequired = {
    to: "mario@weblio.hr",
    from: `${data.firstName} ${data.lastName} <sendgrid@em3332.weblio.hr>`,
    replyTo: `${data.firstName} ${data.lastName} <${data.email}>`,
    subject: "Application - LEGION Model Management",
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
  };

  try {
    await sgMail.send(msg);
    return result;
  } catch (error) {
    return { success: false, error };
  }
};
