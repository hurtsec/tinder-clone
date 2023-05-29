import { XCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";

const AuthModal = (props: {
  isSignUp: boolean;
  handleAuthModalClick: () => void;
}) => {
  const { isSignUp, handleAuthModalClick } = props;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden overscroll-contain bg-neutral-900 bg-opacity-30">
      <div className="relative flex w-full max-w-lg flex-col items-center rounded-xl bg-neutral-900 p-10">
        <div
          className="absolute right-3 top-3 w-5 cursor-pointer text-neutral-500"
          onClick={handleAuthModalClick}
        >
          <XCircleIcon />
        </div>
        <h2 className="text-2xl font-bold uppercase italic text-neutral-100">
          {isSignUp ? "Create Account" : "Get Started"}
        </h2>
        <p className="py-3 text-center font-semibold text-neutral-100">
          By clicking Log In, you agree to our terms. Learn how we process your
          data in our Privacy Policy and Cookie Policy.
        </p>
        {/* <button className="mb-4 w-full rounded-full border-2 border-neutral-500 py-1 text-2xl font-bold text-neutral-500 hover:bg-neutral-800">
          Log in with Facebook
        </button> */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="mb-4 w-full rounded-full border-2 border-neutral-500 py-1 text-2xl font-bold text-neutral-500 hover:bg-neutral-800"
        >
          Log in with GitHub
        </button>
        <div className="w-full pb-4 pt-4">
          <hr className="border-t-2 border-neutral-500" />
        </div>
        <h2 className="text-2xl font-bold uppercase italic text-neutral-100">
          Get The App
        </h2>
      </div>
    </div>
  );
};

export default AuthModal;
