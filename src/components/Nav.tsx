import Image from "next/image";

const Nav = (props: {
  minimal?: boolean;
  handleNavAuthButtonClicked: () => void;
}) => {
  const { minimal, handleNavAuthButtonClicked } = props;
  const authToken = false;

  return (
    <nav className="flex w-full items-center justify-between p-4">
      <div className="">
        <Image
          src={
            minimal
              ? "/images/color-logo-tinder.png"
              : "/images/tinder_logo_white.png"
          }
          alt="Tinder Logo"
          width={170}
          height={40}
        />
      </div>
      {!authToken && !minimal && (
        <button
          onClick={handleNavAuthButtonClicked}
          className="rounded-xl border-none bg-white px-5 py-3 text-lg font-semibold text-red-700"
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
