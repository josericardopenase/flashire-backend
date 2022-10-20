export interface AuthResponse {
	refresh: string
	access: string
}

export interface LoginForm {
	email: string
	password: string
}
