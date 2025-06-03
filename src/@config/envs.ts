import z from "zod";
const envSchema = z.object({
  API_URL: z.string().url(),
});

type EnvSchema = z.infer<typeof envSchema>;

const { error, data } = envSchema.safeParse({
  API_URL: import.meta.env.VITE_API_URL,
});

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

export const envs: EnvSchema = data;
