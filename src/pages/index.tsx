import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import AuthModal from "~/components/AuthModal";
import Nav from "~/components/Nav";

const Home: NextPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const authToken = false;
  const handleHRBButtonClick = () => {
    console.log("Clicked");
    setIsSignUp(true);
    setShowAuthModal(true);
  };
  const handleSignInButtonClick = () => {
    console.log("Clicked");
    setIsSignUp(false);
    setShowAuthModal(true);
  };
  const handleAuthModalClick = () => {
    console.log("Auth modal clicked");
    setShowAuthModal(false);
  };

  return (
    <>
      <Head>
        <title>Tinder Clone</title>
        <meta name="description" content="Tinder Clone by Hurtsec" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center bg-hero-pattern">
        <Nav
          minimal={false}
          handleNavAuthButtonClicked={handleSignInButtonClick}
        />
        <section className="flex flex-grow flex-col items-center justify-center">
          <h1 className="pb-8 text-8xl font-extrabold text-white">
            Swipe Right
          </h1>
          <button
            className="rounded-3xl border-none bg-gradient-to-bl from-orange-700 to-red-700 px-7 py-3 text-base uppercase text-white hover:from-red-700 hover:to-orange-700"
            onClick={handleHRBButtonClick}
          >
            {authToken ? "Signout" : "Create Account"}
          </button>
          {showAuthModal && (
            <AuthModal
              handleAuthModalClick={handleAuthModalClick}
              isSignUp={isSignUp}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
