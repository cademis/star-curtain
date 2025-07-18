import { Box, SxProps, TextField, Theme } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useTRPC } from "../../../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateEstimatedOneRepMax } from "../../../utils";
import { upsertLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { useQuery } from "@tanstack/react-query";

const style: SxProps<Theme> = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
});

interface Props {
  id?: number;
  onSubmit: (data: z.infer<typeof upsertLogSchema>) => void;
}

export function EditLogForm({ onSubmit, id }: Props) {
  const isCreateMode = id == null;

  const trpc = useTRPC();
  const { handleSubmit, register, control } = useForm({
    resolver: zodResolver(upsertLogSchema),
  });

  const [weight, reps] = useWatch({ control, name: ["weight", "reps"] });

  const { data: log } = useQuery({
    ...trpc.log.getLog.queryOptions(id!),
    enabled: !isCreateMode,
  });

  const e1rm = calculateEstimatedOneRepMax(reps, weight);

  console.log(log);

  return (
    <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Weight" type="number" {...register("weight")} />
      <TextField label="Sets" type="number" {...register("sets")} />
      <TextField label="Reps" type="number" {...register("reps")} />
      <TextField label="e1rm" type="number" value={e1rm} />
    </Box>
  );
}
