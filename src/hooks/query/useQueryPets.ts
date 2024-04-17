"use client";

import { getOwners } from "@/api/petApi";
import { useQuery } from "@tanstack/react-query";

export const GET_OWNERS = "GetOwnerss";

export function useQueryOwners() {
  return useQuery({
    queryKey: [GET_OWNERS],
    queryFn: async () => {
      const { data } = await getOwners();
      if (data) {
        return data;
      }
    },
  });
}
