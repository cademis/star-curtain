import { useQuery } from "@tanstack/react-query";
import { EditForm } from "./EditApparatusForm";
import { useTRPC } from "../../../utils/trpc";

type Props = {
  apparatusId: number;
};

export function UpdateApparatusForm({ apparatusId }: Props) {
  const trpc = useTRPC();

  const {
    data: selectedApparatus,
    isLoading,
    isError,
  } = useQuery({
    ...trpc.apparatus.getApparatusById.queryOptions(apparatusId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!selectedApparatus) {
    return <div>No Data</div>;
  }

  const handleUpdate = () => {
    //
  };

  return <EditForm initialValues={selectedApparatus} onSubmit={handleUpdate} />;
}
