import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
const SignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log("data >", data);

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
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="pb-2">
        <input
          type="password"
          placeholder="password"
          autoComplete="false"
          className="border-2 border-neutral-500 p-2 text-lg"
          {...register("password", {
            required: { value: true, message: "Password is required." },
          })}
        />
      </div>
      {errors.password && <span>{errors.password.message}</span>}
      <div className="flex justify-center pt-2">
        <input
          className="cursor-pointer rounded-3xl border-2 border-neutral-500 bg-white px-7 py-3 text-base font-semibold uppercase text-neutral-500 hover:border-neutral-700 hover:text-neutral-700"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SignInForm;