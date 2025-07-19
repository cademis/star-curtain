import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateEstimatedOneRepMax } from "../../../utils";
import { updateLogSchema } from "@repo/trpc-server/schemas/log.schema";

const style: SxProps<Theme> = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid rgb(0, 0, 0)",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
});

type UpdateLogSchema = z.infer<typeof updateLogSchema>;

interface Props {
  log: UpdateLogSchema | null;
  onSubmit: (data: UpdateLogSchema) => void;
}

const updateLogFormSchema = updateLogSchema.omit({ id: true });
type UpdateLogFormSchema = z.infer<typeof updateLogFormSchema>;

export function EditLogForm({ onSubmit, log }: Props) {
  const { handleSubmit, register, control } = useForm({
    mode: "onBlur",
    resolver: zodResolver(updateLogFormSchema),
    defaultValues: log || updateLogFormSchema.parse({}),
  });

  const [weight, reps] = useWatch({ control, name: ["weight", "reps"] });

  const e1rm = calculateEstimatedOneRepMax(reps, weight);

  const handleValidSubmit = (data: UpdateLogFormSchema) => {
    if (!log?.id) {
      console.error("Log ID is missing, cannot submit form.");
      return;
    }
    onSubmit({ ...data, id: log.id });
  };

  const onSubmitHandler = handleSubmit(handleValidSubmit);

  return (
    <Box sx={style} component={"form"} onSubmit={onSubmitHandler}>
      <TextField
        label="Weight"
        type="number"
        {...register("weight", { valueAsNumber: true })}
      />
      <TextField
        label="Sets"
        type="number"
        {...register("sets", { valueAsNumber: true })}
      />
      <TextField
        label="Reps"
        type="number"
        {...register("reps", { valueAsNumber: true })}
      />
      <TextField
        label="RIR"
        type="number"
        {...register("rir", { valueAsNumber: true })}
      />
      <TextField label="Notes" {...register("notes")} />
      <TextField label="e1rm" type="number" value={e1rm} disabled />
    </Box>
  );
}
