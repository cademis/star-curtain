import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../../../utils/trpc";
import { EditApparatusForm } from "./EditApparatusForm";
import { defaultValues } from "../../../constants/defaultValues";
import { z } from "zod";
import { createApparatusSchema } from "@repo/db/schema/apparatus";

type Props = {
  setOpen: (value: boolean) => void;
};

export function CreateApparatus({ setOpen }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: createApparatus } = useMutation(
    trpc.apparatus.createApparatus.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.apparatus.getApparatuses.queryKey(),
        });
        console.log("success!!");
        setOpen(false);
      },
      onError: (err) => console.log("error", err),
    })
  );

  const handleSubmit = (data: z.infer<typeof createApparatusSchema>) => {
    createApparatus(data);
  };

  return (
    <EditApparatusForm initialValues={defaultValues} onSubmit={handleSubmit} />
  );
}
