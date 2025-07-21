import { Box, Button, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useWatch, UseFormRegister, Control, UseFormHandleSubmit } from "react-hook-form";
import { calculateEstimatedOneRepMax } from "../../../utils";

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

interface LogFormProps {
  title: string;
  submitButtonText: string;
  register: UseFormRegister<any>;
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
}

export function LogForm({
  title,
  submitButtonText,
  register,
  control,
  handleSubmit,
  onSubmit,
}: LogFormProps) {
  const [weight, reps] = useWatch({ control, name: ["weight", "reps"] });

  const e1rm = calculateEstimatedOneRepMax(reps, weight);

  return (
    <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
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
      <Button type="submit" variant="contained">
        {submitButtonText}
      </Button>
    </Box>
  );
}