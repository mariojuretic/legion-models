"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { NewsletterFormSchema } from "@/lib/schema";
import { submitNewsletterForm } from "@/app/actions";

type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>;

export default function NewsletterForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormInputs>({
    resolver: zodResolver(NewsletterFormSchema),
  });

  const submitHandler: SubmitHandler<NewsletterFormInputs> = async (data) => {
    setSubmitting(true);

    setSuccessMessage(null);
    setErrorMessage(null);

    const response = await submitNewsletterForm(data);

    if (!response || !response.success) {
      setErrorMessage("Something went wrong.");
    } else {
      const message =
        response.status === "subscribed"
          ? "Subscription successful."
          : "Please confirm your e-mail address.";

      setSuccessMessage(message);
      reset();
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="brand-text flex w-full max-w-[100ch] flex-col gap-4 lg:gap-8"
    >
      {/* Text Input - First Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="first-name">First Name*</label>
        <input
          type="text"
          {...register("firstName")}
          id="first-name"
          placeholder="First Name"
          autoComplete="off"
          className="custom-text-input"
        />
        {errors.firstName?.message && (
          <p className="text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      {/* Text Input - Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email">E-Mail*</label>
        <input
          type="email"
          {...register("email")}
          id="email"
          placeholder="E-Mail"
          autoComplete="off"
          className="custom-text-input"
        />
        {errors.email?.message && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center gap-2">
        <button disabled={submitting} className="custom-submit-button">
          {submitting ? "Submitting..." : "Subscribe"}
        </button>

        {!submitting && errorMessage && (
          <p className="text-red-600">{errorMessage}</p>
        )}
        {!submitting && successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}
      </div>
    </form>
  );
}
