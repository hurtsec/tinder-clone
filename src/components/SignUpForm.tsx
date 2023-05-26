import { useRouter } from "next/router";
import { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUpForm = () => {
  // const ctx = api.useContext();
  const { mutate } = api.auth.createUser.useMutation({
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data >", data);
    console.log("Make post request to save to db");
    mutate(data);
    await router.push("/onboarding");
  };
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form
      className="flex w-full flex-col py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-center pb-2">
        <input
          type="email"
          placeholder="email"
          className="w-10/12 border-2 border-neutral-500 p-2 text-lg"
          {...register("email", {
            required: { value: true, message: "Email is required." },
          })}
        />
      </div>
      {errors.email && <span>{errors.email.message}</span>}
      <div className="flex justify-center pb-2">
        <input
          type="password"
          autoComplete="false"
          placeholder="password"
          className="w-10/12 border-2 border-neutral-500 p-2 text-lg"
          {...register("password", {
            required: { value: true, message: "Password is required." },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />
      </div>
      {errors.password && <span>{errors.password.message}</span>}
      <div className="flex justify-center pb-2">
        <input
          type="password"
          autoComplete="false"
          placeholder="confirm password"
          className="w-10/12 border-2 border-neutral-500 p-2 text-lg"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Password confirmation required.",
            },
            validate: (value) =>
              value === password.current || "The passwords do not match.",
          })}
        />
      </div>
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      <div className="flex justify-center pt-2">
        <input
          className="cursor-pointer rounded-3xl border-2 border-neutral-500 bg-white px-7 py-3 text-base font-semibold uppercase text-neutral-500 hover:border-neutral-700 hover:text-neutral-700"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
