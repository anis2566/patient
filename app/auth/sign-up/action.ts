"use server";

import { db } from "@/lib/prisma";
import { SignUpSchema, SignUpSchemaType } from "./schema";
import { saltAndHashPassword } from "@/lib/utils";

export const SIGN_UP_USER = async (values: SignUpSchemaType) => {
  const { data, success } = SignUpSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = saltAndHashPassword(data.password);

  await db.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return {
    success: "Registration successful",
  };
};
