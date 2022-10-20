import useAppSelector from "@storage/hooks/useAppSelector"
import { Navigate, useLocation } from "react-router-dom"

export default function PrivateRoute({ children }: { children: JSX.Element }) {
	const auth = useAppSelector((store) => store.auth)
	const location = useLocation()

	if (!auth.token) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		// eslint-disable-next-line react/react-in-jsx-scope
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return children
}
