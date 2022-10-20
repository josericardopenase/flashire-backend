export interface User {
	id: number
	email: string
	last_login: number
	is_superuser: boolean
	first_name: string
	last_name: string
	phone?: number
	is_staff: boolean
	is_active: boolean
	role: "TEACHER" | "STUDENT" | "SECRETARY" | "MANAGER"
	date_joined: string
	avatar: string
	extra: any
	rank_points: number
	_brand: number
	groups: { id: number; name: string }[]
	user_permissions: any[]
	_brand_permissions: any[]
	teacher_profile: number
	secretary_profile: any
	has_holded_profile: boolean
	offices: number[]
}
