"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { GetScoutedFormSchema } from "@/lib/schema";
import { submitGetScoutedForm } from "@/app/actions";

type GetScoutedFormInputs = Omit<
  z.infer<typeof GetScoutedFormSchema>,
  "headshot" | "profileHeadshot" | "halfBodyShot" | "fullBodyShot"
> & {
  headshot: FileList;
  profileHeadshot: FileList;
  halfBodyShot: FileList;
  fullBodyShot: FileList;
};

export default function GetScoutedForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GetScoutedFormInputs>({
    resolver: zodResolver(GetScoutedFormSchema),
  });

  const submitHandler: SubmitHandler<GetScoutedFormInputs> = async (data) => {
    setSubmitting(true);

    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("headshot", data.headshot[0]);
    formData.append("profileHeadshot", data.profileHeadshot[0]);
    formData.append("halfBodyShot", data.halfBodyShot[0]);
    formData.append("fullBodyShot", data.fullBodyShot[0]);

    const response = await submitGetScoutedForm(formData);

    if (!response || !response.success) {
      setErrorMessage("Something went wrong.");
    } else {
      setSuccessMessage("Application successful.");
      reset();
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="brand-text mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:gap-8 xl:grid-cols-2 2xl:gap-x-16"
    >
      {/* Gender Radio Buttons */}
      <div className="flex flex-col gap-2 xl:col-span-2">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Radio Input - Male */}
          <label
            htmlFor="gender-male"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              {...register("gender")}
              id="gender-male"
              value="male"
              className="peer hidden"
            />
            <div className="custom-radio-input" />
            <span>Male</span>
          </label>

          {/* Radio Input - Female */}
          <label
            htmlFor="gender-female"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              {...register("gender")}
              id="gender-female"
              value="female"
              className="peer hidden"
            />
            <div className="custom-radio-input" />
            <span>Female</span>
          </label>
        </div>

        {errors.gender?.message && (
          <p className="text-red-600">{errors.gender.message}</p>
        )}
      </div>

      {/* Inputs - Left Column */}
      <div className="flex flex-col gap-4 lg:gap-8">
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

        {/* Text Input - Last Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="last-name">Last Name*</label>
          <input
            type="text"
            {...register("lastName")}
            id="last-name"
            placeholder="Last Name"
            autoComplete="off"
            className="custom-text-input"
          />
          {errors.lastName?.message && (
            <p className="text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        {/* Text Input - Birthday */}
        <div className="flex flex-col gap-2">
          <label htmlFor="birthday">Birthday*</label>
          <input
            type="text"
            {...register("birthday")}
            id="birthday"
            placeholder="Birthday"
            autoComplete="off"
            className="custom-text-input"
          />
          {errors.birthday?.message && (
            <p className="text-red-600">{errors.birthday.message}</p>
          )}
        </div>

        {/* Text Input - Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail*</label>
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="E-mail"
            autoComplete="off"
            className="custom-text-input"
          />
          {errors.email?.message && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Text Input - Height */}
        <div className="flex flex-col gap-2">
          <label htmlFor="height">Height*</label>
          <input
            type="text"
            {...register("height")}
            id="height"
            placeholder="Height"
            autoComplete="off"
            className="custom-text-input"
          />
          {errors.height?.message && (
            <p className="text-red-600">{errors.height.message}</p>
          )}
        </div>

        {/* Text Input - Country / City */}
        <div className="flex flex-col gap-2">
          <label htmlFor="country-city">Country / City*</label>
          <input
            type="text"
            {...register("countryCity")}
            id="country-city"
            placeholder="Country / City"
            autoComplete="off"
            className="custom-text-input"
          />
          {errors.countryCity?.message && (
            <p className="text-red-600">{errors.countryCity.message}</p>
          )}
        </div>
      </div>

      {/* Inputs - Right Column */}
      <div className="flex flex-col gap-4 lg:gap-8 xl:gap-16">
        {/* Text Input - Instagram */}
        <div className="flex flex-col gap-2">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            {...register("instagram")}
            id="instagram"
            placeholder="Instagram"
            autoComplete="off"
            className="custom-text-input"
          />
        </div>

        {/* Checkboxes Container */}
        <div className="flex flex-col gap-4 lg:gap-8">
          {/* Checkbox Input - Terms */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="accept-terms"
              className="flex cursor-pointer items-start gap-4"
            >
              <input
                type="checkbox"
                {...register("acceptTerms")}
                id="accept-terms"
                className="peer hidden"
              />
              <div className="custom-checkbox-input" />
              <span>I have read and understood the privacy policy.</span>
            </label>
            {errors.acceptTerms?.message && (
              <p className="text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>

          {/* Checkbox Input - Age */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="accept-age"
              className="flex cursor-pointer items-start gap-4"
            >
              <input
                type="checkbox"
                {...register("acceptAge")}
                id="accept-age"
                className="peer hidden"
              />
              <div className="custom-checkbox-input" />
              <span>
                If below the age of 18 please click here with the authorisation
                from your parents.
              </span>
            </label>
            {errors.acceptAge?.message && (
              <p className="text-red-600">{errors.acceptAge.message}</p>
            )}
          </div>

          {/* Checkbox Input - Photos */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="accept-photos"
              className="flex cursor-pointer items-start gap-4"
            >
              <input
                type="checkbox"
                {...register("acceptPhotos")}
                id="accept-photos"
                className="peer hidden"
              />
              <div className="custom-checkbox-input" />
              <span>
                All photos must be raw and unretouched additionally, please do
                not submit any photos that contain a digital filter.
              </span>
            </label>
            {errors.acceptPhotos?.message && (
              <p className="text-red-600">{errors.acceptPhotos.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* <div className="custom-image-upload">
            <span className="custom-image-upload-button">Upload</span>
          </div> */}

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("headshot")}
              accept="image/jpeg, image/png, image/webp"
            />
            {errors.headshot?.message && (
              <p className="text-red-600">{errors.headshot.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("profileHeadshot")}
              accept="image/jpeg, image/png, image/webp"
            />
            {errors.profileHeadshot?.message && (
              <p className="text-red-600">{errors.profileHeadshot.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("halfBodyShot")}
              accept="image/jpeg, image/png, image/webp"
            />
            {errors.halfBodyShot?.message && (
              <p className="text-red-600">{errors.halfBodyShot.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("fullBodyShot")}
              accept="image/jpeg, image/png, image/webp"
            />
            {errors.fullBodyShot?.message && (
              <p className="text-red-600">{errors.fullBodyShot.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center gap-2 xl:col-start-2 xl:col-end-3">
        <button
          disabled={submitting}
          className="brand-text cursor-pointer rounded-none border-0 bg-black px-6 py-2 text-white outline-none disabled:cursor-not-allowed disabled:bg-black/50 dark:bg-white dark:text-black dark:disabled:bg-white/50"
        >
          {submitting ? "Submitting..." : "Submit"}
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
