import Nav from "~/components/Nav";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  first_name: string;
  dob_day: number;
  dob_month: number;
  dob_year: number;
  show_gender: boolean;
  gender_identity: string;
  gender_interest: string;
  profile_image: string;
};

const Onboarding = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <>
      <Nav
        minimal={true}
        handleNavAuthButtonClicked={() => {
          return;
        }}
      />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold uppercase italic">Create Account</h2>
        <form
          className="flex w-full justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="flex w-1/3 flex-col p-5">
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold" htmlFor="first_name">
                First Name
              </label>
              <input
                className="rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
                type="text"
                placeholder="First Name"
                {...register("first_name", {
                  required: { value: true, message: "Name is required." },
                })}
              />
              {errors.first_name && <span>{errors.first_name.message}</span>}
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
                  })}
                />
                <input
                  className="w-3/12 rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
                  type="number"
                  name="dob_month"
                  placeholder="MM"
                />
                <input
                  className="w-3/12 rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
                  type="number"
                  name="dob_year"
                  placeholder="YYYY"
                />
              </div>
            </div>
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold">Gender</label>
              <div className="flex gap-3">
                <div className="flex">
                  <input
                    className="peer sr-only"
                    id="man-gender-identity"
                    type="radio"
                    name="gender_identity"
                    value="man"
                    checked={false}
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
                    name="gender_identity"
                    value="woman"
                    checked={false}
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
                    name="gender_identity"
                    value="nonbinary"
                    checked={false}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
                    htmlFor="nonbinary-gender-identity"
                  >
                    Non-Binary
                  </label>
                </div>
              </div>
            </div>
            <div className="flex pb-3">
              <label className="font-semibold" htmlFor="show-gender">
                Show gender on my profile
              </label>
              <input
                id="show-gender"
                type="checkbox"
                name="show_gender"
                checked={false}
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
                    name="gender_interest"
                    value="man"
                    checked={false}
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
                    name="gender_interest"
                    value="woman"
                    checked={false}
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
                    name="gender_interest"
                    value="everyone"
                    checked={false}
                  />
                  <label
                    className="rounded-xl border-2 border-neutral-300 p-3 font-semibold transition-all peer-checked:border-red-700"
                    htmlFor="everyone-gender-interest"
                  >
                    Everyone
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-3">
              <label className="pb-3 font-semibold" htmlFor="about">
                About Me
              </label>
              <input
                className="rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
                id="about"
                type="text"
                name="about"
                placeholder="I like long walks..."
              />
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
                name="profile_image"
                id="profile-image"
                placeholder="Photo URL"
                className="rounded-xl border-2 border-neutral-300 px-7 py-4 text-base"
              />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
