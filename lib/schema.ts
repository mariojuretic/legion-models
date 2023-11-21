import { z } from "zod";

export const GetScoutedFormSchema = z.object({
  gender: z.string({ invalid_type_error: "Gender is required." }),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  birthday: z.string().min(1, "Birthday is required."),
  email: z
    .string()
    .min(1, "E-mail is required.")
    .email("Enter a valid e-mail address."),
  height: z.string().min(1, "Height is required."),
  countryCity: z.string().min(1, "Country / City is required."),
  instagram: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "This field is required." }),
  }),
  acceptAge: z.literal(true, {
    errorMap: () => ({ message: "This field is required." }),
  }),
  acceptPhotos: z.literal(true, {
    errorMap: () => ({ message: "This field is required." }),
  }),
});
