import Nav from "~/components/Nav";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import type { UserOnboardingInputs } from "~/common/validation/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Onboarding = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserOnboardingInputs>();
  const { mutate } = api.users.update.useMutation({
    onSuccess: (data) => console.log("success", data),
    onError: () => console.log("error"),
  });
  const { data: session, status } = useSession();
  const onSubmit: SubmitHandler<UserOnboardingInputs> = (data) => {
    const { dob_day, dob_month, dob_year } = data;
    mutate({
      ...data,
      dob_day: parseInt(dob_day, 10),
      dob_month: parseInt(dob_month, 10),
      dob_year: parseInt(dob_year, 10),
    });
  };
  const profileImage = watch("image");

  useEffect(() => {
    if (status !== "loading" && session)
      reset({ name: session.user.name || "", image: session.user.image || "" });
  }, [status, reset, session]);

  return (
    <>
      <Nav
        minimal={true}
        handleNavAuthButtonClicked={() => {
          return;
        }}
      />
      <div className="flex flex-col items-center border border-x-0 border-b-0 border-neutral-400">
        <h2 className="text-2xl font-bold uppercase italic">Create Account</h2>
        <form
          className="flex w-full justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="flex w-1/3 flex-col p-5">
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold" htmlFor="name">
                Name
              </label>
              <input
                className="rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: { value: true, message: "Name is required." },
                })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold">Birthday</label>
              <div className="flex gap-3">
                <input
                  className="w-3/12 rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
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
                  })}
                />
                <input
                  className="w-3/12 rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
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
                  })}
                />
                <input
                  className="w-3/12 rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
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
                  })}
                />
              </div>
              {errors.dob_day && <span>{errors.dob_day.message}</span>}
              {errors.dob_month && <span>{errors.dob_month.message}</span>}
              {errors.dob_year && <span>{errors.dob_year.message}</span>}
            </div>
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold">Gender</label>
              <div className="flex gap-3">
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="man-gender-identity"
                    type="radio"
                    value="man"
                    {...register("gender_identity", {
                      required: {
                        value: true,
                        message: "Please select a gender identity.",
                      },
                    })}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
                    htmlFor="man-gender-identity"
                  >
                    Man
                  </label>
                </div>
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="woman-gender-identity"
                    type="radio"
                    value="woman"
                    {...register("gender_identity", {
                      required: {
                        value: true,
                        message: "Please select a gender identity.",
                      },
                    })}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
                    htmlFor="woman-gender-identity"
                  >
                    Woman
                  </label>
                </div>
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="nonbinary-gender-identity"
                    type="radio"
                    value="nonbinary"
                    {...register("gender_identity", {
                      required: {
                        value: true,
                        message: "Please select a gender identity.",
                      },
                    })}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
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
            <div className="flex pb-3">
              <label className="font-semibold" htmlFor="show-gender">
                Show gender on my profile
              </label>
              <input
                id="show-gender"
                type="checkbox"
                {...register("show_gender")}
              />
            </div>
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold">Show Me</label>
              <div className="flex gap-3">
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="man-gender-interest"
                    type="radio"
                    value="men"
                    {...register("gender_interest", {
                      required: {
                        value: true,
                        message: "Please select a gender interest.",
                      },
                    })}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
                    htmlFor="man-gender-interest"
                  >
                    Men
                  </label>
                </div>
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="woman-gender-interest"
                    type="radio"
                    value="women"
                    {...register("gender_interest", {
                      required: {
                        value: true,
                        message: "Please select a gender interest.",
                      },
                    })}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
                    htmlFor="woman-gender-interest"
                  >
                    Women
                  </label>
                </div>
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="everyone-gender-interest"
                    type="radio"
                    value="everyone"
                    {...register("gender_interest", {
                      required: {
                        value: true,
                        message: "Please select a gender interest.",
                      },
                    })}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
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
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold" htmlFor="about">
                About Me
              </label>
              <input
                className="rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
                id="about"
                type="text"
                placeholder="I like long walks..."
                {...register("about", {
                  required: { value: true, message: "Tell us about yourself." },
                  maxLength: {
                    value: 10000,
                    message: "Limited to 10,000 characters.",
                  },
                })}
              />
              {errors.about && <span>{errors.about.message}</span>}
            </div>
            <input
              className="cursor-pointer rounded-lg border-2 border-neutral-300 bg-neutral-100 py-3 font-semibold hover:bg-neutral-200 active:bg-red-400"
              type="submit"
            />
          </section>
          <section className="flex w-1/3 flex-col p-5">
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold" htmlFor="profile-image">
                Profile Photo
              </label>
              <input
                type="url"
                id="profile-image"
                placeholder="Photo URL"
                className="rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
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
    </>
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
