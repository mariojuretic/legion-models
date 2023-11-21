"use server";

import { z } from "zod";

import { GetScoutedFormSchema } from "@/lib/schema";

type GetScoutedFormInputs = z.infer<typeof GetScoutedFormSchema>;

export const submitGetScoutedForm = async (data: GetScoutedFormInputs) => {
  const result = GetScoutedFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};
