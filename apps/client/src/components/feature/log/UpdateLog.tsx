import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { useTRPC } from "../../../utils/trpc";
import { EditLogForm } from "./EditLogForm";

interface Props {
  id: number;
}
export function UpdateLog({ id }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: updateLog } = useMutation({
    ...trpc.log.updateLog.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trpc.log.getLog.queryKey(id) });
    },
  });

  const { data: log, isLoading } = useQuery({
    ...trpc.log.getLog.queryOptions(id),
    enabled: !!id,
  });

  const handleSubmit = (data: z.infer<typeof updateLogSchema>) => {
    updateLog(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <EditLogForm onSubmit={handleSubmit} log={log ?? null} />;
}
