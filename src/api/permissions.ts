import ApiService from "@davinci/ApiService"
import { Permission, PermissionClass } from "@wowtypes/db/permission"

class PermissionApiService extends ApiService<Permission> {
	get classes() {
		return this.addDetailedCrud<PermissionClass>("classes", "/classes/")
	}
}

export const PermissionService = new PermissionApiService(["permissions"], "permissions/")
