import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "../utils/trpc";

export function Homepage() {
  const trpc = useTRPC();

  const userQuery = useQuery(trpc.getUser.queryOptions({ id: 1 }));

  return (
    <>
      <div>Hello app</div>
      <div>{userQuery.data?.name}</div>
    </>
  );
}
