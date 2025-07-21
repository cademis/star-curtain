import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { updateLogSchema } from "@repo/trpc-server/schemas/log.schema";
import { useTRPC } from "../../../utils/trpc";
import { EditLogForm } from "./EditLogForm";
import { LoadingState } from "../../../components/ui/LoadingState";
import { ErrorState } from "../../../components/ui/ErrorState";

interface Props {
  id: number;
  setOpen: (value: boolean) => void;
}
export function UpdateLog({ id, setOpen }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: updateLog } = useMutation({
    ...trpc.log.updateLog.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trpc.log.getLog.queryKey(id) });
      setOpen(false);
    },
  });

  const {
    data: log,
    isLoading,
    isError,
  } = useQuery({
    ...trpc.log.getLog.queryOptions(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingState title="Loading" message="Loading" />;
  }

  if (isError) {
    return <ErrorState title="Error" message="error" />;
  }

  const handleSubmit = (data: z.infer<typeof updateLogSchema>) => {
    updateLog(data);
  };

  if (!log) return <div>No log found</div>;

  return <EditLogForm onSubmit={handleSubmit} log={log} />;
}
