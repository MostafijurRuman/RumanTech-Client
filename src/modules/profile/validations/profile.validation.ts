import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(6).max(30).optional().or(z.literal("")),
});

export const addressSchema = z.object({
  label: z.string().max(40).optional(),
  name: z.string().min(2).max(80),
  phone: z.string().min(6).max(30),
  line1: z.string().min(3).max(160),
  line2: z.string().max(160).optional(),
  city: z.string().min(2).max(80),
  state: z.string().max(80).optional(),
  postalCode: z.string().max(20).optional(),
  country: z.string().min(2).max(80).default("Bangladesh"),
  isDefault: z.boolean().default(false),
});
