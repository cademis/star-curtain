import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { LogForm } from "./LogForm";

type UpdateLogSchema = z.infer<typeof updateLogSchema>;

interface EditLogFormProps {
  log: UpdateLogSchema;
  onSubmit: (data: UpdateLogSchema) => void;
}

const updateLogFormSchema = updateLogSchema.omit({ id: true });

export function EditLogForm({ log, onSubmit }: EditLogFormProps) {
  const { handleSubmit, register, control } = useForm({
    mode: "onBlur",
    resolver: zodResolver(updateLogFormSchema),
    defaultValues: updateLogFormSchema.parse(log),
  });

  const handleValidSubmit = (data: z.infer<typeof updateLogFormSchema>) => {
    onSubmit({ ...data, id: log.id });
  };

  return (
    <LogForm
      title="Edit Log"
      submitButtonText="Update Log"
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={handleValidSubmit}
    />
  );
}
