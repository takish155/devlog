import { GetSessionResponse } from "@/app/api/session/route";
import { useQuery } from "@tanstack/react-query";

const useSessionHook = () => {
  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/session");
      const json: GetSessionResponse = await res.json();

      return json.data;
    },
    retry: 1,
    refetchInterval: 1000 * 60 * 3,
  });

  return { session, isLoading };
};

export type UseSessionHook = ReturnType<typeof useSessionHook>;

export default useSessionHook;
