import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(254),
  phone: z.string().trim().max(30, "Phone number is too long.").optional().or(z.literal("")),
  projectType: z.string().trim().min(2, "Please choose a project type.").max(80),
  message: z.string().trim().min(10, "Please tell us a little more about the project.").max(4000),
  website: z.string().max(0).optional(),
});
export type QuoteInput = z.infer<typeof quoteSchema>;
