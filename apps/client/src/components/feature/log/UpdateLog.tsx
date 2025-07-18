//<UpdateLog selectedRow={selectedRow} setOpen={setOpen} />;

import { useQuery } from "@tanstack/react-query";
import { EditLogForm } from "./EditLogForm";
import { useTRPC } from "../../../utils/trpc";

interface Props {
  selectedRow: number;
  setOpen: (state: boolean) => void;
}

export function UpdateLog({ selectedRow, setOpen }: Props) {
  const trpc = useTRPC();

  const { data: log } = useQuery(trpc.log.getLog.queryOptions(selectedRow));

  return <EditLogForm onSubmit={} />;
}
