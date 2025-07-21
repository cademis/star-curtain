import { z } from "zod";
import { EditApparatusForm } from "./EditApparatusForm";
import {
  bodyParts,
  apparatusInsertSchema,
} from "@repo/trpc-server/schemas/apparatus.schema";
import { useTRPC } from "../../../utils/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ApparatusForm } from "./ApparatusForm";

export function CreateApparatusForm() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: createApparatus } = useMutation(
    trpc.apparatus.createApparatus.mutationOptions({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: trpc.apparatus.getApparatuses.queryKey(),
        }),
    })
  );

  const handleCreate = (data: z.infer<typeof apparatusInsertSchema>) => {
    createApparatus(data);
  };

  const form = useForm({});

  return <ApparatusForm onSubmit={handleCreate} form={form} mode={} />;
}
