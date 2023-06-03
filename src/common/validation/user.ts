import { z } from "zod";
import isAlphanumeric from "validator/lib/isAlphanumeric";

export const GenderIdentityEnum = z.enum(["MAN", "WOMAN", "NONBINARY"]);
export const GenderInterestEnum = z.enum(["MEN", "WOMEN", "EVERYONE"]);

export type UserOnboardingInputs = {
  name: string;
  email: string;
  emailVerified: Date;
  show_gender: boolean;
  gender_identity: z.infer<typeof GenderIdentityEnum>;
  gender_interest: z.infer<typeof GenderInterestEnum>;
  about: string;
  image: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
};

export const User = z.object({
  id: z.string().cuid(),
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
  email: z.string().email(),
  emailVerified: z.date(),
  show_gender: z.boolean(),
  gender_identity: GenderIdentityEnum,
  gender_interest: GenderInterestEnum,
  about: z
    .string()
    .max(4096)
    .refine((val) => isAlphanumeric(val)),
  image: z.string().min(1).max(2048).url(),
  likes: z.array(z.string().cuid()),
  likedBy: z.array(z.string().cuid()),
  messages_sent: z.array(z.string().cuid()),
  messages_received: z.array(z.string().cuid()),
});

export const UserOnboarding = User.omit({
  id: true,
  email: true,
  emailVerified: true,
  likes: true,
  likedBy: true,
  messages_sent: true,
  messages_received: true,
});
