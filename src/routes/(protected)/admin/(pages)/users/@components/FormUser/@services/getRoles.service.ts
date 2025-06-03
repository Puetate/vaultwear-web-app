import API from "@/@lib/axios/api";
import { Role } from "@/@models/role.model";
import { useQuery } from "@tanstack/react-query";

export const ROLE_QUERY_KEY = "role";

export function getRolesService() {
const url = "/role";
return API.get<Role[]>({url})
    
}

export const useGetRoles = () => {
return useQuery<Role[]>({
queryKey: [ROLE_QUERY_KEY],
queryFn: getRolesService
});
}