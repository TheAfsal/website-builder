// import { z } from "zod";

// export const RegisterSchema = z
//   .object({
//     name: z.string().min(1, "Name is required"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export type RegisterFormData = z.infer<typeof RegisterSchema>;
