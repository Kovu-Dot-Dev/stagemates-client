import { getProfile, type GetProfileResponse } from "../services/getProfile"
import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query"

type UseProfileQueryResult = UseQueryResult<GetProfileResponse, Error>

export const useProfileQuery = (
  id?: string,
  options?: Omit<UseQueryOptions<GetProfileResponse, Error>, "queryKey" | "queryFn">
): UseProfileQueryResult => {
  return useQuery<GetProfileResponse, Error>({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    enabled: !!id,
    ...options,
  })
}
