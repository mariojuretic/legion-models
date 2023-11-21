"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { GetScoutedFormSchema } from "@/lib/schema";
import { submitGetScoutedForm } from "@/app/actions";

type GetScoutedFormInputs = z.infer<typeof GetScoutedFormSchema>;

export default function GetScoutedForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GetScoutedFormInputs>({
    resolver: zodResolver(GetScoutedFormSchema),
  });

  const submitHandler: SubmitHandler<GetScoutedFormInputs> = async (data) => {
    const response = await submitGetScoutedForm(data);

    if (!response) {
      console.log("Something went wrong.");
      return;
    }

    if (response.error) {
      console.log(response.error);
      return;
    }

    reset();
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
          <div className="custom-image-upload">
            <span className="custom-image-upload-button">Upload</span>
          </div>

          <div className="custom-image-upload">
            <span className="custom-image-upload-button">Upload</span>
          </div>

          <div className="custom-image-upload">
            <span className="custom-image-upload-button">Upload</span>
          </div>

          <div className="custom-image-upload">
            <span className="custom-image-upload-button">Upload</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center xl:col-start-2 xl:col-end-3">
        <button className="brand-text cursor-pointer rounded-none border-0 bg-black px-6 py-2 text-white outline-none dark:bg-white dark:text-black">
          Submit
        </button>
      </div>
    </form>
  );
}
