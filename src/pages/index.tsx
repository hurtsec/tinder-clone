import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Nav from "~/components/Nav";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const authToken = false;
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <>
      <Head>
        <title>Tinder Clone</title>
        <meta name="description" content="Tinder Clone by Hurtsec" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center bg-slate-800">
        <Nav minimal={false} authToken={authToken} />
        <section>
          <h1>Swipe Right</h1>
          <button
            className="rounded-3xl border-none bg-gradient-to-bl from-orange-700 to-red-700 px-7 py-3 text-base uppercase text-white hover:from-red-700 hover:to-orange-700"
            onClick={handleClick}
          >
            {authToken ? "Signout" : "Create Account"}
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
