export interface Permission {
	id: number
	name: string
	dgt_name: string
}

export interface PermissionClass {
	id: number
	permission: number
	name: string
	color: string
	duration: number
}
