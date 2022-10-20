export const setLocalToken = (token: string) => {
	try {
		localStorage.setItem("token", token)
	} catch (error) {
		console.log("Error storing token", error)
	}
}

export const getLocalToken = () => {
	try {
		return localStorage.getItem("token")
	} catch (error) {
		console.log("Error storing token", error)
	}
}

export const removeLocalToken = () => {
	try {
		return localStorage.removeItem("token")
	} catch (error) {
		console.log("Error removing the auth token", error)
	}
}
