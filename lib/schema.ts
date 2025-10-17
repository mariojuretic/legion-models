import { z } from "zod";

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

export const GetScoutedFormSchema = z.object({
  gender: z.string({ invalid_type_error: "Gender is required." }),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  birthday: z.string().min(1, "Birthday is required."),
  email: z
    .string()
    .min(1, "E-mail is required.")
    .email("Enter a valid e-mail address."),
  phone: z.string().min(1, "Phone is required."),
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
  headshot: z
    .any()
    .refine(
      (val) => (typeof window !== "undefined" ? val?.length === 1 : val),
      "Photo is required.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? val?.[0]?.size <= MAX_FILE_SIZE
          : val?.size <= MAX_FILE_SIZE,
      "Max file size is 2MB.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? ACCEPTED_FILE_TYPES.includes(val?.[0]?.type)
          : ACCEPTED_FILE_TYPES.includes(val?.type),
      "JPEG and PNG files are accepted.",
    ),
  profileHeadshot: z
    .any()
    .refine(
      (val) => (typeof window !== "undefined" ? val?.length === 1 : val),
      "Photo is required.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? val?.[0]?.size <= MAX_FILE_SIZE
          : val?.size <= MAX_FILE_SIZE,
      "Max file size is 2MB.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? ACCEPTED_FILE_TYPES.includes(val?.[0]?.type)
          : ACCEPTED_FILE_TYPES.includes(val?.type),
      "JPEG and PNG files are accepted.",
    ),
  halfBodyShot: z
    .any()
    .refine(
      (val) => (typeof window !== "undefined" ? val?.length === 1 : val),
      "Photo is required.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? val?.[0]?.size <= MAX_FILE_SIZE
          : val?.size <= MAX_FILE_SIZE,
      "Max file size is 2MB.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? ACCEPTED_FILE_TYPES.includes(val?.[0]?.type)
          : ACCEPTED_FILE_TYPES.includes(val?.type),
      "JPEG and PNG files are accepted.",
    ),
  fullBodyShot: z
    .any()
    .refine(
      (val) => (typeof window !== "undefined" ? val?.length === 1 : val),
      "Photo is required.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? val?.[0]?.size <= MAX_FILE_SIZE
          : val?.size <= MAX_FILE_SIZE,
      "Max file size is 2MB.",
    )
    .refine(
      (val) =>
        typeof window !== "undefined"
          ? ACCEPTED_FILE_TYPES.includes(val?.[0]?.type)
          : ACCEPTED_FILE_TYPES.includes(val?.type),
      "JPEG and PNG files are accepted.",
    ),
});

export const NewsletterFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  email: z
    .string()
    .min(1, "E-mail is required.")
    .email("Enter a valid e-mail address."),
});
