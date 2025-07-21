import { useTRPC } from "../../../utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { upsertApparatusDtoSchema } from "@repo/db/schema/apparatus";
import * as z from "zod";
import { EditApparatusForm } from "./EditApparatusForm";

type Props = {
  setOpen: (value: boolean) => void;
  selectedRow: number;
};

export function UpdateApparatus({ selectedRow, setOpen }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: selectedApparatus } = useQuery({
    ...trpc.apparatus.getApparatus.queryOptions(selectedRow),
  });

  const { mutate: updateApparatus } = useMutation(
    trpc.apparatus.updateApparatus.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.apparatus.getAllApparatus.queryKey(),
        });
        setOpen(false);
      },
    })
  );

  const handleSubmit = (formData: z.infer<typeof upsertApparatusDtoSchema>) => {
    const { ...data } = formData;

    updateApparatus({
      ...data,
      id: selectedRow,
    });
  };

  if (!selectedApparatus) {
    return null;
  }

  return (
    <EditApparatusForm
      initialValues={selectedApparatus}
      onSubmit={handleSubmit}
      id={selectedRow}
    />
  );
}
