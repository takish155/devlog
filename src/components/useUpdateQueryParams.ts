"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useUpdateQueryParams = () => {
  // todo: fix this
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  return (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    const exists = params.get(key);
    if (exists) {
      params.delete(key);
    }

    params.set(key, value);

    router.push(pathName + "?" + params.toString());
  };
};

export default useUpdateQueryParams;
