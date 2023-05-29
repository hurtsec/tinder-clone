import { z } from "zod";
import isAlphanumeric from "validator/lib/isAlphanumeric";

enum GenderIdentity {
  Man = "man",
  Woman = "woman",
  Nonbinary = "nonbinary",
}

enum GenderInterests {
  Men = "men",
  Women = "women",
  Everyone = "everyone",
}

export type UserOnboardingInputs = {
  name: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  show_gender: boolean;
  gender_identity: GenderIdentity;
  gender_interest: GenderInterests;
  about: string;
  image: string;
};

export const UserOnboarding = z.object({
  name: z
    .string()
    .min(1)
    .max(128)
    .regex(new RegExp(/[\p{Letter}\p{Mark}-]+/gu), {
      message: "Name must only contain letters and hyphens",
    }),
  dob_day: z.number().min(1).max(31),
  dob_month: z.number().min(1).max(12),
  dob_year: z.number().min(1900).max(9999),
  show_gender: z.boolean(),
  gender_identity: z.nativeEnum(GenderIdentity),
  gender_interest: z.nativeEnum(GenderInterests),
  about: z
    .string()
    .max(4096)
    .refine((val) => isAlphanumeric(val)),
  image: z.string().min(1).max(2048).url(),
});
