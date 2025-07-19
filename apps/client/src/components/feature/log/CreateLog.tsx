import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../../../utils/trpc";
import { EditLogForm } from "./EditLogForm";
import { z } from "zod";
import { createLogSchema } from "@repo/db/schema/log.schema";
import { useState } from "react";

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
          queryKey: trpc.log.getLogsWithApparatus.queryKey(),
        });
        console.log("success!!");
        setOpen(false);
      },
      onError: (err) => console.log("error", err),
    })
  );

  const handleSubmit = async (data: z.infer<typeof createLogSchema>) => {
    const result = createLog(data);
  };

  return <EditLogForm onSubmit={handleSubmit} />;
}
