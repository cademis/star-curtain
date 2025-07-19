import { updateLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { z } from "zod";

// Schema for the Edit Log form, omitting the 'id' which is not set by the user.
export const editLogFormSchema = updateLogSchema.omit({ id: true });

// Type for form values, inferred from the form-specific schema.
export type EditLogFormValues = z.infer<typeof editLogFormSchema>;
