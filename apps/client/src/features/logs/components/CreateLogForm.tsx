import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { LogForm } from "./LogForm";

type CreateLogSchema = z.infer<typeof createLogSchema>;

interface CreateLogFormProps {
  onSubmit: (data: CreateLogSchema) => void;
}

export function CreateLogForm({ onSubmit }: CreateLogFormProps) {
  const { handleSubmit, register, control } = useForm({
    mode: "onBlur",
    resolver: zodResolver(createLogSchema),
    defaultValues: createLogSchema.parse({}),
  });

  return (
    <LogForm
      title="Create New Log"
      submitButtonText="Create Log"
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
}