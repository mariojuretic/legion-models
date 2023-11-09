"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  gender: "male" | "female" | null;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  height: string;
  countryCity: string;
  instagram: string;
  acceptTerms: boolean;
  acceptAge: boolean;
  acceptPhotos: boolean;
};

export default function GetScoutedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      gender: null,
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      height: "",
      countryCity: "",
      instagram: "",
      acceptTerms: false,
      acceptAge: false,
      acceptPhotos: false,
    },
  });

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="brand-text mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:gap-8 xl:grid-cols-2 2xl:gap-x-16"
    >
      <div className="flex flex-col gap-y-2 xl:col-span-2">
        <div className="flex gap-x-4 lg:gap-x-8">
          <label
            htmlFor="gender-male"
            className="flex cursor-pointer items-center gap-x-2"
          >
            <input
              type="radio"
              {...register("gender", { required: "Gender is required." })}
              id="gender-male"
              value="male"
              className="peer hidden"
            />
            <div className="flex h-3 w-3 items-center justify-center rounded-full border border-black/50 before:hidden before:h-2 before:w-2 before:rounded-full before:bg-black peer-checked:border-black peer-checked:before:block dark:border-white/50 dark:before:bg-white dark:peer-checked:border-white" />
            <span>Male</span>
          </label>

          <label
            htmlFor="gender-female"
            className="flex cursor-pointer items-center gap-x-2"
          >
            <input
              type="radio"
              {...register("gender", { required: "Gender is required." })}
              id="gender-female"
              value="female"
              className="peer hidden"
            />
            <div className="flex h-3 w-3 items-center justify-center rounded-full border border-black/50 before:hidden before:h-2 before:w-2 before:rounded-full before:bg-black peer-checked:border-black peer-checked:before:block dark:border-white/50 dark:before:bg-white dark:peer-checked:border-white" />
            <span>Female</span>
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-y-4 lg:gap-y-8">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required." })}
            id="firstName"
            placeholder="First Name"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
          {errors.firstName && (
            <p className="text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required." })}
            id="lastName"
            placeholder="Last Name"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
          {errors.lastName && (
            <p className="text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="birthday">Birthday*</label>
          <input
            type="text"
            {...register("birthday", { required: "Birthday is required." })}
            id="birthday"
            placeholder="Birthday"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
          {errors.birthday && (
            <p className="text-red-600">{errors.birthday.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">E-mail*</label>
          <input
            type="text"
            {...register("email", { required: "E-mail is required." })}
            id="email"
            placeholder="E-mail"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="height">Height*</label>
          <input
            type="text"
            {...register("height", { required: "Height is required." })}
            id="height"
            placeholder="Height"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
          {errors.height && (
            <p className="text-red-600">{errors.height.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="countryCity">Country / City*</label>
          <input
            type="text"
            {...register("countryCity", {
              required: "Country / City is required.",
            })}
            id="countryCity"
            placeholder="Country / City"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
          {errors.countryCity && (
            <p className="text-red-600">{errors.countryCity.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-4 lg:gap-y-8 xl:gap-y-16">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            {...register("instagram")}
            id="instagram"
            placeholder="Instagram"
            className="brand-text rounded-none border-0 border-b border-b-black/50 bg-transparent p-2 outline-none placeholder:text-black/50 focus:border-b-black dark:border-b-white/50 dark:placeholder:text-white/50 dark:focus:border-b-white"
          />
        </div>

        <div className="flex flex-col gap-y-4 lg:gap-y-8">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="acceptTerms"
              className="flex cursor-pointer items-start gap-x-4"
            >
              <input
                type="checkbox"
                {...register("acceptTerms", {
                  required: "This field is required.",
                })}
                id="acceptTerms"
                className="peer hidden"
              />
              <div className="flex h-3 w-3 shrink-0 items-center justify-center border border-black/50 before:hidden before:h-2 before:w-2 before:bg-black peer-checked:border-black peer-checked:before:block dark:border-white/50 dark:before:bg-white dark:peer-checked:border-white" />
              <span>I have read and understood the privacy policy.</span>
            </label>
            {errors.acceptTerms && (
              <p className="text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="acceptAge"
              className="flex cursor-pointer items-start gap-x-4"
            >
              <input
                type="checkbox"
                {...register("acceptAge", {
                  required: "This field is required.",
                })}
                id="acceptAge"
                className="peer hidden"
              />
              <div className="flex h-3 w-3 shrink-0 items-center justify-center border border-black/50 before:hidden before:h-2 before:w-2 before:bg-black peer-checked:border-black peer-checked:before:block dark:border-white/50 dark:before:bg-white dark:peer-checked:border-white" />
              <span>
                If below the age of 18 please click here with the authorisation
                from your parents.
              </span>
            </label>
            {errors.acceptAge && (
              <p className="text-red-600">{errors.acceptAge.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="acceptPhotos"
              className="flex cursor-pointer items-start gap-x-4"
            >
              <input
                type="checkbox"
                {...register("acceptPhotos", {
                  required: "This field is required.",
                })}
                id="acceptPhotos"
                className="peer hidden"
              />
              <div className="flex h-3 w-3 shrink-0 items-center justify-center border border-black/50 before:hidden before:h-2 before:w-2 before:bg-black peer-checked:border-black peer-checked:before:block dark:border-white/50 dark:before:bg-white dark:peer-checked:border-white" />
              <span>
                All photos must be raw and unretouched additionally, please do
                not submit any photos that contain a digital filter.
              </span>
            </label>
            {errors.acceptPhotos && (
              <p className="text-red-600">{errors.acceptPhotos.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex aspect-square w-full cursor-pointer items-end justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
            <div className="bg-white px-6 py-1 text-black dark:bg-black dark:text-white">
              Upload
            </div>
          </div>
          <div className="flex aspect-square w-full cursor-pointer items-end justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
            <div className="bg-white px-6 py-1 text-black dark:bg-black dark:text-white">
              Upload
            </div>
          </div>
          <div className="flex aspect-square w-full cursor-pointer items-end justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
            <div className="bg-white px-6 py-1 text-black dark:bg-black dark:text-white">
              Upload
            </div>
          </div>
          <div className="flex aspect-square w-full cursor-pointer items-end justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
            <div className="bg-white px-6 py-1 text-black dark:bg-black dark:text-white">
              Upload
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center xl:col-start-2 xl:col-end-3">
        <input
          type="submit"
          value="Submit"
          className="brand-text cursor-pointer rounded-none border-0 bg-black px-6 py-2 text-white outline-none dark:bg-white dark:text-black"
        />
      </div>
    </form>
  );
}
