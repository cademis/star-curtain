import { useTRPC } from "../utils/trpc";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export function DeleteApparatusButton({ id }: { id: number }) {
  const trpc = useTRPC();
  const { mutate: deleteApparatusById } = useMutation(
    trpc.apparatus.deleteApparatusById.mutationOptions()
  );

  return <Button onClick={() => deleteApparatusById(id)}>Delete</Button>;
}
