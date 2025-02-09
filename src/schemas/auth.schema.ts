import z from "zod";

const username = z
  .string()
  .min(3, { message: "errors.minUsernameError" })
  .max(20, { message: "errors.maxUsernameError" })
  .regex(/^[a-zA-Z0-9_]*$/, {
    message: "errors.invalidUsernameKeyError",
  });

const email = z
  .string()
  .email({ message: "errors.invalidEmailError" })
  .max(100, {
    message: "errors.maxEmailError",
  });

const password = z
  .string()
  .min(6, { message: "errors.minPasswordError" })
  .max(100, {
    message: "errors.maxPasswordError",
  });

export const signInSchema = z.object({
  username,
  password,
});

export const signUpSchema = z
  .object({
    username,
    email,
    displayName: z
      .string()
      .min(3, {
        message: "errors.minDisplayNameError",
      })
      .max(20, { message: "errors.maxDisplayNameError" }),
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password && data.password === data.confirmPassword, {
    message: "errors.passwordMatchError",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
