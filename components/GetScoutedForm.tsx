"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { GetScoutedFormSchema } from "@/lib/schema";
import { submitGetScoutedForm } from "@/app/actions";

import headshotPlaceholder from "@/images/headshot.png";
import profileHeadshotPlaceholder from "@/images/profile-headshot.png";
import halfBodyShotPlaceholder from "@/images/half-body-shot.png";
import fullBodyShotPlaceholder from "@/images/full-body-shot.png";

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

  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [profileHeadshotPreview, setProfileHeadshotPreview] = useState<
    string | null
  >(null);
  const [halfBodyShotPreview, setHalfBodyShotPreview] = useState<string | null>(
    null,
  );
  const [fullBodyShotPreview, setFullBodyShotPreview] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<GetScoutedFormInputs>({
    resolver: zodResolver(GetScoutedFormSchema),
  });

  const headshotFile = watch("headshot");
  const profileHeadshotFile = watch("profileHeadshot");
  const halfBodyShotFile = watch("halfBodyShot");
  const fullBodyShotFile = watch("fullBodyShot");

  useEffect(() => {
    if (!headshotFile || headshotFile.length !== 1)
      return setHeadshotPreview(null);

    const previewUrl = URL.createObjectURL(headshotFile[0]);
    setHeadshotPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [headshotFile]);

  useEffect(() => {
    if (!profileHeadshotFile || profileHeadshotFile.length !== 1)
      return setProfileHeadshotPreview(null);

    const previewUrl = URL.createObjectURL(profileHeadshotFile[0]);
    setProfileHeadshotPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [profileHeadshotFile]);

  useEffect(() => {
    if (!halfBodyShotFile || halfBodyShotFile.length !== 1)
      return setHalfBodyShotPreview(null);

    const previewUrl = URL.createObjectURL(halfBodyShotFile[0]);
    setHalfBodyShotPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [halfBodyShotFile]);

  useEffect(() => {
    if (!fullBodyShotFile || fullBodyShotFile.length !== 1)
      return setFullBodyShotPreview(null);

    const previewUrl = URL.createObjectURL(fullBodyShotFile[0]);
    setFullBodyShotPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [fullBodyShotFile]);

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

        {/* Text Input - Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Phone*</label>
          <input
            type="text"
            {...register("phone")}
            id="phone"
            placeholder="Phone"
            autoComplete="off"
            className="custom-text-input"
          />
          {errors.phone?.message && (
            <p className="text-red-600">{errors.phone.message}</p>
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
      </div>

      {/* Inputs - Right Column */}
      <div className="flex flex-col gap-4 lg:gap-8 xl:justify-between xl:gap-0">
        <div className="flex flex-col gap-4 lg:gap-8">
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
                All photos must be raw and unretouched additionally. Please do
                not submit any photos that contain a digital filter. Do not wear
                makeup. Take images in front facing natural daylight.
              </span>
            </label>
            {errors.acceptPhotos?.message && (
              <p className="text-red-600">{errors.acceptPhotos.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("headshot")}
              id="headshot"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
            />
            <label htmlFor="headshot" className="custom-image-upload">
              <Image
                src={headshotPreview ? headshotPreview : headshotPlaceholder}
                alt="Headshot preview"
                fill
                className={`object-cover object-center ${
                  !headshotPreview && "opacity-10 invert dark:invert-0"
                }`}
              />
              <span className="custom-image-upload-button">
                {headshotPreview ? "Change" : "Upload"}
              </span>
            </label>
            {errors.headshot?.message && (
              <p className="text-red-600">{errors.headshot.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("profileHeadshot")}
              id="profile-headshot"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
            />
            <label htmlFor="profile-headshot" className="custom-image-upload">
              <Image
                src={
                  profileHeadshotPreview
                    ? profileHeadshotPreview
                    : profileHeadshotPlaceholder
                }
                alt="Profile headshot preview"
                fill
                className={`object-cover object-center ${
                  !profileHeadshotPreview && "opacity-10 invert dark:invert-0"
                }`}
              />
              <span className="custom-image-upload-button">
                {profileHeadshotPreview ? "Change" : "Upload"}
              </span>
            </label>
            {errors.profileHeadshot?.message && (
              <p className="text-red-600">{errors.profileHeadshot.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("halfBodyShot")}
              id="half-body-shot"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
            />
            <label htmlFor="half-body-shot" className="custom-image-upload">
              <Image
                src={
                  halfBodyShotPreview
                    ? halfBodyShotPreview
                    : halfBodyShotPlaceholder
                }
                alt="Half-body shot preview"
                fill
                className={`object-cover object-center ${
                  !halfBodyShotPreview && "opacity-10 invert dark:invert-0"
                }`}
              />
              <span className="custom-image-upload-button">
                {halfBodyShotPreview ? "Change" : "Upload"}
              </span>
            </label>
            {errors.halfBodyShot?.message && (
              <p className="text-red-600">{errors.halfBodyShot.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="file"
              {...register("fullBodyShot")}
              id="full-body-shot"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
            />
            <label htmlFor="full-body-shot" className="custom-image-upload">
              <Image
                src={
                  fullBodyShotPreview
                    ? fullBodyShotPreview
                    : fullBodyShotPlaceholder
                }
                alt="Full-body shot preview"
                fill
                className={`object-cover object-center ${
                  !fullBodyShotPreview && "opacity-10 invert dark:invert-0"
                }`}
              />
              <span className="custom-image-upload-button">
                {fullBodyShotPreview ? "Change" : "Upload"}
              </span>
            </label>
            {errors.fullBodyShot?.message && (
              <p className="text-red-600">{errors.fullBodyShot.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center gap-2 xl:col-start-2 xl:col-end-3">
        <button disabled={submitting} className="custom-submit-button">
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
