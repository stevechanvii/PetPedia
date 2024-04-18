"use client";

import { getOwners } from "@/api/petApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const GET_OWNERS = "GetOwnerss";

export function useQueryOwners() {
  return useQuery({
    queryKey: [GET_OWNERS],
    queryFn: async () => {
      try {
        const { data } = await getOwners();
        return data;
      } catch (error) {
        toast.error("Error: cannot get data from api");
      }
    },
  });
}
