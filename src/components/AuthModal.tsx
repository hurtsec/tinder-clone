import { XCircleIcon } from "@heroicons/react/24/outline";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const AuthModal = (props: {
  isSignUp: boolean;
  handleAuthModalClick: () => void;
}) => {
  const { isSignUp, handleAuthModalClick } = props;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden overscroll-contain bg-neutral-900 bg-opacity-30">
      <div className="relative flex w-full max-w-lg flex-col items-center rounded-xl bg-white p-10">
        <div
          className="absolute right-3 top-3 w-5 cursor-pointer"
          onClick={handleAuthModalClick}
        >
          <XCircleIcon />
        </div>
        <h2 className="text-2xl font-bold uppercase italic">
          {isSignUp ? "Create Account" : "Log In"}
        </h2>
        <p className="py-3 text-center font-semibold">
          By clicking Log In, you agree to our terms. Learn how we process your
          data in our Privacy Policy and Cookie Policy.
        </p>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <div className="w-full pb-4 pt-8">
          <hr className="border-t-2 border-neutral-500" />
        </div>
        <h2 className="text-2xl font-bold uppercase italic">Get The App</h2>
      </div>
    </div>
  );
};

export default AuthModal;
