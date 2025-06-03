import API from "@/@lib/axios/api";
import { ContentType } from "@/@models/content-type.model";
import { useQuery } from "@tanstack/react-query";

export const CONTENT_TYPE_QUERY_KEY = "content-type";

export function getContentTypeService() {
  const url = "/content-type";
  return API.get<ContentType[]>({ url });
}

export const useGetContentType = () => {
  return useQuery<ContentType[]>({
    queryKey: [CONTENT_TYPE_QUERY_KEY],
    queryFn: getContentTypeService
  });
};
