import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../../../utils/trpc";
import { z } from "zod";
import { createLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { CreateLogForm } from "./CreateLogForm";

type Props = {
  setOpen: (value: boolean) => void;
};

export function CreateLog({ setOpen }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: createLog } = useMutation(
    trpc.log.createLog.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.log.getLogs.queryKey(),
        });
        setOpen(false);
      },
      onError: (err) => console.log("error", err),
    })
  );

  const handleSubmit = async (data: z.infer<typeof createLogSchema>) => {
    createLog(data);
  };

  // return <EditLogForm  onSubmit={handleSubmit} />;
  return <CreateLogForm onSubmit={handleSubmit} />;
}
