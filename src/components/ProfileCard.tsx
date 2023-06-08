import type { User } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserIcon from "./icons/User";
import {
  GenderIdentityEnum,
  GenderInterestEnum,
} from "~/common/validation/user";

const ProfileCard = ({ user }: { user: User }) => {
  const [userDob, setUserDob] = useState<Date>();

  useEffect(() => {
    if (!user || !user.dob_year || !user.dob_month || !user.dob_day) return;
    const { dob_year, dob_month, dob_day } = user;
    setUserDob(new Date(dob_year, dob_month, dob_day));
  }, [user]);
  return (
    <div className="flex h-screen w-1/4 overflow-auto border-l border-neutral-700">
      {user && (
        <div className="flex w-full flex-col">
          <div
            className="h-116 min-h-116 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user.image || ""})` }}
          ></div>
          <div className="border-b border-neutral-700 p-3">
            <h3 className="text-4xl font-semibold text-white">
              {user.name}{" "}
              <span className="text-3xl">{`${dayjs(new Date()).diff(
                dayjs(userDob),
                "year"
              )}`}</span>
            </h3>
          </div>
          {user.show_gender && (
            <div className="border-b border-neutral-700 p-3">
              <h3 className="text-xl font-semibold text-white">Pronouns</h3>
              <div className="flex gap-2 pt-2">
                <span className="flex cursor-default items-center gap-1 rounded-2xl border border-neutral-700 py-1 pl-2 pr-4 font-semibold">
                  <span className="rounded-full border border-neutral-700 p-0.5">
                    <UserIcon />
                  </span>
                  <span>
                    {user.gender_identity === GenderIdentityEnum.Enum.MAN
                      ? "He"
                      : user.gender_identity === GenderIdentityEnum.Enum.WOMAN
                      ? "She"
                      : "They"}
                  </span>
                </span>
                <span className="flex cursor-default items-center gap-1 rounded-2xl border border-neutral-700 py-1 pl-2 pr-4 font-semibold">
                  <span className="rounded-full border border-neutral-700 p-0.5">
                    <UserIcon />
                  </span>
                  <span>
                    {user.gender_identity === GenderIdentityEnum.Enum.MAN
                      ? "Him"
                      : user.gender_identity === GenderIdentityEnum.Enum.WOMAN
                      ? "Her"
                      : "Them"}
                  </span>
                </span>
              </div>
            </div>
          )}
          <div className="border-b border-neutral-700 p-3">
            <h3 className="text-xl font-semibold text-white">Interested In</h3>
            <div className="flex gap-2 pt-2">
              <span className="flex cursor-default items-center gap-1 rounded-2xl border border-neutral-700 px-4 py-1 font-semibold">
                <span>
                  {user.gender_interest === GenderInterestEnum.Enum.MEN
                    ? "Men"
                    : user.gender_interest === GenderInterestEnum.Enum.WOMEN
                    ? "Women"
                    : "Everyone"}
                </span>
              </span>
            </div>
          </div>
          <div className="border-b border-neutral-700 p-3">
            <p>{user.about}</p>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-neutral-700 p-3">
            <button className="px-6 pb-2 text-xl font-semibold text-neutral-500 hover:text-neutral-400">
              Unmatch
            </button>
            <span className="text-neutral-500">
              No longer interested? Remove them from your matches.
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-neutral-700 p-3">
            <button className="px-6 pb-2 text-xl font-semibold text-neutral-500 hover:text-neutral-400">
              Block {user.name}
            </button>
            <span className="text-neutral-500">
              You won&lsquo;t see them, they won&lsquo;t see you.
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <button className="px-6 pb-2 text-xl font-semibold text-neutral-500 hover:text-neutral-400">
              Report {user.name}
            </button>
            <span className="text-neutral-500">
              Don&lsquo;t worry - we won&lsquo;t tell them.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
