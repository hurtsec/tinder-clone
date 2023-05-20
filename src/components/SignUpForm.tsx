import { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data >", data);
    console.log("Make post request to save to db");
  };
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form className="flex flex-col py-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-2">
        <input
          type="email"
          placeholder="email"
          className="border-2 border-neutral-500 p-2 text-lg"
          {...register("email", {
            required: { value: true, message: "Email is required." },
          })}
        />
      </div>
      {errors.email && <span>{errors.email.message}</span>}
      <div className="pb-2">
        <input
          type="password"
          autoComplete="false"
          placeholder="password"
          className="p-2 text-lg border-neutral-500 border-2"
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
      <div className="pb-2">
        <input
          type="password"
          autoComplete="false"
          placeholder="confirm password"
          className="p-2 text-lg border-neutral-500 border-2"
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
      <input
        className="cursor-pointer rounded-3xl border-2 border-neutral-500 bg-white px-7 py-3 text-base font-semibold uppercase text-neutral-500 hover:border-neutral-700 hover:text-neutral-700"
        type="submit"
      />
    </form>
  );
};

export default SignUpForm;
