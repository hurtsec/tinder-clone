import type { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatContainer from "~/components/ChatContainer";
import { api } from "~/utils/api";
import User from "~/components/icons/User";
import {
  GenderIdentityEnum,
  GenderInterestEnum,
} from "~/common/validation/user";
import ProfileCard from "~/components/ProfileCard";
import Close from "~/components/icons/Close";
import { SubmitHandler, useForm } from "react-hook-form";

dayjs.extend(relativeTime);

const Messages = ({ id }: { id: string }) => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => void router.replace("/"),
  });
  const { data: whoAmI } = api.users.whoAmI.useQuery();
  const { data: user } = api.users.get.useQuery({ id });
  const { data: matches } = api.match.getMatches.useQuery();
  const { mutate } = api.messages.send.useMutation({
    onSuccess: (data) => console.log("data :>> ", data),
    onError: () => console.log("error"),
  });
  const { register, handleSubmit, watch, reset } = useForm<{
    message: string;
  }>();
  const message = watch("message");

  const onSubmit: SubmitHandler<{ message: string }> = (data) => {
    if (!user) return;
    mutate({ recipientId: user.id, ...data });
    reset({ message: "" });
  };

  return (
    <div className="flex h-full w-full">
      {whoAmI && matches && (
        <ChatContainer user={whoAmI} matches={matches} activeMatch={id} />
      )}
      <div className="flex h-screen flex-grow flex-col justify-between">
        <div className="flex items-center gap-3 border-b border-neutral-700 px-6 py-4">
          <div
            className="h-12 w-12 rounded-full border-2 bg-cover bg-center"
            style={{ backgroundImage: `url(${user?.image || ""})` }}
          ></div>

          <span className="flex-grow text-lg font-semibold text-neutral-500">
            You matched with {user?.name}
          </span>
          <button className="rounded-full border border-neutral-500 text-neutral-500 hover:border-neutral-400 hover:text-neutral-400">
            <Close />
          </button>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <h3 className="text-4xl text-white">Start the conversation!</h3>
        </div>
        <div className="flex w-full justify-between border-t border-neutral-700 p-4">
          <input
            type="text"
            className="w-full bg-transparent font-semibold text-neutral-300 focus-visible:outline-none"
            placeholder="Type a message"
            {...register("message", {
              maxLength: {
                value: 1024,
                message: "Messages must be less than 1024 characters.",
              },
            })}
          />
          <button
            disabled={!message}
            className="rounded-3xl bg-gradient-to-bl from-orange-700 to-red-700 px-4 py-2 font-semibold uppercase text-white hover:from-red-700 hover:to-orange-700 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-500"
            onClick={handleSubmit(onSubmit)}
          >
            Send
          </button>
        </div>
      </div>
      {user && <ProfileCard user={user} />}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = (context) => {
  const userId = context.params?.id;
  console.log("context.params :>> ", context.params);

  return { props: { id: userId } };
};

export default Messages;
