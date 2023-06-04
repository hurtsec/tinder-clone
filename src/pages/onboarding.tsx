import { type SubmitHandler, useForm } from "react-hook-form";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import {
  GenderIdentityEnum,
  GenderInterestEnum,
  UserOnboarding,
} from "~/common/validation/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import ChatContainer from "~/components/ChatContainer";
import type { User } from "@prisma/client";

const Onboarding = () => {
  const router = useRouter();
  const { data: whoAmI } = api.users.whoAmI.useQuery();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<User>();
  const { mutate } = api.users.onboard.useMutation({
    onSuccess: (data) => console.log("success", data),
    onError: () => console.log("error"),
  });
  const { data: session, status: sessionStatus } = useSession();
  const { data: currentUser, status: currentUserStatus } =
    api.users.whoAmI.useQuery();
  const showGender = watch("show_gender");
  const profileImage = watch("image");

  useEffect(() => {
    if (sessionStatus !== "loading" && session)
      reset({ name: session.user.name || "", image: session.user.image || "" });
  }, [sessionStatus, reset, session]);

  useEffect(() => {
    if (currentUserStatus !== "loading" && currentUser?.onboarding_completed)
      void router.replace("/dashboard");
  }, [currentUserStatus, currentUser, router]);

  const onSubmit: SubmitHandler<User> = (data) => {
    const validatedData = UserOnboarding.parse(data);
    mutate(validatedData);
    void router.replace("/dashboard");
  };

  return (
    <div className="flex gap-5">
      {whoAmI && <ChatContainer user={whoAmI} />}
      <div className="flex h-screen w-full items-center justify-center">
        <div className="relative flex h-screen max-h-116 w-96 flex-col overflow-auto rounded-2xl shadow-center-lg shadow-neutral-400">
          <div className="flex w-full justify-center border-b border-neutral-700 bg-neutral-900 p-5">
            <h3 className="text-lg font-bold text-red-500">Edit Info</h3>
          </div>
          <div className="flex-grow overflow-auto pb-20">
            <form className="flex w-full justify-center">
              <section className="flex w-full flex-col pt-1">
                <div className="flex flex-col pb-1">
                  <label className="px-3 pb-1 text-lg font-bold" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="border-y border-neutral-700 bg-neutral-900 px-7 py-4 text-base"
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: { value: true, message: "Name is required." },
                    })}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="flex flex-col pb-1">
                  <label className="px-3 pb-1 text-lg font-bold">
                    Birthday
                  </label>
                  <div className="flex">
                    <input
                      className="w-4/12 border-y border-neutral-700 bg-neutral-900 px-7 py-4 text-base"
                      type="number"
                      placeholder="DD"
                      {...register("dob_day", {
                        required: {
                          value: true,
                          message: "Birth Day is required.",
                        },
                        min: {
                          value: 1,
                          message: "Birth Day must be between 1-31.",
                        },
                        max: {
                          value: 31,
                          message: "Birth Day must be between 1-31.",
                        },
                        valueAsNumber: true,
                      })}
                    />
                    <input
                      className="w-4/12 border-y border-neutral-700 bg-neutral-900 px-7 py-4 text-base"
                      type="number"
                      placeholder="MM"
                      {...register("dob_month", {
                        required: {
                          value: true,
                          message: "Birth Month is required",
                        },
                        min: {
                          value: 1,
                          message: "Birth Month must be between 1-12.",
                        },
                        max: {
                          value: 12,
                          message: "Birth Month must be between 1-12.",
                        },
                        valueAsNumber: true,
                      })}
                    />
                    <input
                      className="w-4/12 border-y border-neutral-700 bg-neutral-900 px-7 py-4 text-base"
                      type="number"
                      placeholder="YYYY"
                      {...register("dob_year", {
                        required: {
                          value: true,
                          message: "Birth Year is required.",
                        },
                        min: {
                          value: 1000,
                          message: "Birth Year must be 4 digits.",
                        },
                        max: {
                          value: 9999,
                          message: "Birth Year must be 4 digits.",
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  {errors.dob_day && <span>{errors.dob_day.message}</span>}
                  {errors.dob_month && <span>{errors.dob_month.message}</span>}
                  {errors.dob_year && <span>{errors.dob_year.message}</span>}
                </div>
                <div className="flex flex-col pb-3">
                  <label className="px-3 pb-1 text-lg font-bold">
                    Gender Identity
                  </label>
                  <div className="flex">
                    <div className="flex w-4/12">
                      <input
                        className="peer sr-only"
                        id="man-gender-identity"
                        type="radio"
                        value={GenderIdentityEnum.enum.MAN}
                        {...register("gender_identity", {
                          required: {
                            value: true,
                            message: "Please select a gender identity.",
                          },
                        })}
                      />
                      <label
                        className="w-full border-y border-neutral-700 p-3 text-center font-semibold transition-all peer-checked:bg-red-700"
                        htmlFor="man-gender-identity"
                      >
                        Man
                      </label>
                    </div>
                    <div className="flex w-4/12">
                      <input
                        className="peer sr-only"
                        id="woman-gender-identity"
                        type="radio"
                        value={GenderIdentityEnum.enum.WOMAN}
                        {...register("gender_identity", {
                          required: {
                            value: true,
                            message: "Please select a gender identity.",
                          },
                        })}
                      />
                      <label
                        className="w-full border border-neutral-700 p-3 text-center font-semibold transition-all peer-checked:bg-red-700"
                        htmlFor="woman-gender-identity"
                      >
                        Woman
                      </label>
                    </div>
                    <div className="flex w-4/12">
                      <input
                        className="peer sr-only"
                        id="nonbinary-gender-identity"
                        type="radio"
                        value={GenderIdentityEnum.enum.NONBINARY}
                        {...register("gender_identity", {
                          required: {
                            value: true,
                            message: "Please select a gender identity.",
                          },
                        })}
                      />
                      <label
                        className="w-full border-y border-neutral-700 p-3 text-center font-semibold transition-all peer-checked:bg-red-700"
                        htmlFor="nonbinary-gender-identity"
                      >
                        Non-Binary
                      </label>
                    </div>
                  </div>
                  {errors.gender_identity && (
                    <span>{errors.gender_identity.message}</span>
                  )}
                </div>
                <div className="flex pb-1">
                  <div className="flex w-full items-center justify-between border-y border-neutral-700 bg-neutral-900 px-7 py-4">
                    <label htmlFor="show-gender">
                      Show gender on my profile
                    </label>
                    <label
                      className={`swap rounded-full ${
                        showGender ? "bg-red-700" : "bg-neutral-500"
                      } p-2`}
                      htmlFor="show-gender"
                    >
                      <input
                        id="show-gender"
                        type="checkbox"
                        {...register("show_gender")}
                      />
                      <div className="swap-on">Yes</div>
                      <div className="swap-off">No</div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col pb-1">
                  <label className="px-3 pb-1 text-lg font-bold">Show Me</label>
                  <div className="flex">
                    <div className="flex w-4/12">
                      <input
                        className="peer sr-only"
                        id="man-gender-interest"
                        type="radio"
                        value={GenderInterestEnum.enum.MEN}
                        {...register("gender_interest", {
                          required: {
                            value: true,
                            message: "Please select a gender interest.",
                          },
                        })}
                      />
                      <label
                        className="w-full border-y border-neutral-700 p-3 text-center font-semibold transition-all peer-checked:bg-red-700"
                        htmlFor="man-gender-interest"
                      >
                        Men
                      </label>
                    </div>
                    <div className="flex w-4/12">
                      <input
                        className="peer sr-only"
                        id="woman-gender-interest"
                        type="radio"
                        value={GenderInterestEnum.enum.WOMEN}
                        {...register("gender_interest", {
                          required: {
                            value: true,
                            message: "Please select a gender interest.",
                          },
                        })}
                      />
                      <label
                        className="w-full border border-neutral-700 p-3 text-center font-semibold transition-all peer-checked:bg-red-700"
                        htmlFor="woman-gender-interest"
                      >
                        Women
                      </label>
                    </div>
                    <div className="flex w-4/12">
                      <input
                        className="peer sr-only"
                        id="everyone-gender-interest"
                        type="radio"
                        value={GenderInterestEnum.enum.EVERYONE}
                        {...register("gender_interest", {
                          required: {
                            value: true,
                            message: "Please select a gender interest.",
                          },
                        })}
                      />
                      <label
                        className="w-full border-y border-neutral-700 p-3 text-center font-semibold transition-all peer-checked:bg-red-700"
                        htmlFor="everyone-gender-interest"
                      >
                        Everyone
                      </label>
                    </div>
                  </div>
                  {errors.gender_interest && (
                    <span>{errors.gender_interest.message}</span>
                  )}
                </div>
                <div className="flex flex-col pb-1">
                  <label
                    className="px-3 pb-1 text-lg font-bold"
                    htmlFor="about"
                  >
                    About Me
                  </label>
                  <input
                    className="border-y border-neutral-700 bg-neutral-900 px-7 py-4 text-base"
                    id="about"
                    type="text"
                    placeholder="I like long walks..."
                    {...register("about", {
                      required: {
                        value: true,
                        message: "Tell us about yourself.",
                      },
                      maxLength: {
                        value: 10000,
                        message: "Limited to 10,000 characters.",
                      },
                    })}
                  />
                  {errors.about && <span>{errors.about.message}</span>}
                </div>
                <div className="flex flex-col pb-2">
                  <label
                    className="px-3 pb-1 text-lg font-bold"
                    htmlFor="profile-image"
                  >
                    Profile Photo
                  </label>
                  <input
                    type="url"
                    id="profile-image"
                    placeholder="Photo URL"
                    className="border-y border-neutral-700 bg-neutral-900 px-7 py-4 text-base"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "Please add a profile photo.",
                      },
                      maxLength: {
                        value: 10000,
                        message: "Limited to 10,000 characters.",
                      },
                    })}
                  />
                  {errors.image && <span>{errors.image.message}</span>}
                </div>
                <div>
                  {profileImage && (
                    <img
                      className="w-full"
                      src={profileImage}
                      alt="Profile Image Preview"
                    />
                  )}
                </div>
              </section>
            </form>
          </div>
          <div className="absolute bottom-0 flex w-full justify-center bg-gradient-to-t from-black via-black to-transparent p-3 pt-10">
            <button
              className="rounded-3xl border-none bg-gradient-to-bl from-orange-700 to-red-700 px-5 py-2 text-lg font-bold text-white hover:from-red-700 hover:to-orange-700"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);
  if (!session) return { redirect: { destination: "/", permanent: false } };
  return { props: { session } };
};

export default Onboarding;
