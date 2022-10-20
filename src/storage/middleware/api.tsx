import axios from "axios";
import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { callFailed, callBegan } from "../apiActions";
import jwt_decode from "jwt-decode";
//import { setToken } from "@storage/slices/auth.reducer"
import { apiUrl } from "@utils/constants/api.constants";
import { useToast } from "@chakra-ui/react";

const api: Middleware =
	({ dispatch, getState }: MiddlewareAPI) =>
	(next: Dispatch) =>
	async (action) => {
		if (action.type !== callBegan.type) {
			next(action);
		} else {
			const { url, method, data, onSuccess, onError, onBegin, payload } =
				action.payload;

			if (onBegin) dispatch({ type: onBegin, payload: payload });

			try {
				try {
					let access = getState().auth.access;
					const refresh = getState().auth.refresh;

					const payloadAccess: any = jwt_decode(access);

					if (new Date().getTime() / 1000 > payloadAccess.exp) {
						const refreshResponse = await axios.request({
							baseURL: apiUrl,
							url: "/refresh/",
							method: "post",
							data: { refresh: refresh },
						});

						//dispatch(setToken(refreshResponse.data))
						access = refreshResponse.data.access;
					}

					const response = await axios.request({
						baseURL: apiUrl,
						url,
						method,
						data,
						headers: access
							? { Authorization: `Bearer ${access}` }
							: undefined,
					});
					dispatch({ type: onSuccess, payload: response.data });
				} catch (e) {
					const response = await axios.request({
						baseURL: apiUrl,
						url,
						method,
						data,
					});
					dispatch({ type: onSuccess, payload: response.data });
				}

				//refactor this in typescript
			} catch (error: any) {
				if (onError) {
					try {
						dispatch({
							type: onError,
							payload: error.response.data,
						});
					} catch {
						//significa que el usuario no tiene conextión a internet
						useToast({
							title: "Error",
							description: "No tienes conexión a internet",
							status: "error",
							duration: 9000,
							isClosable: true,
						});
						dispatch({
							type: onError,
							payload: "No tienes conexión a internet",
						});
					}
				}

				dispatch(callFailed(error));
			}
		}
	};

export default api;
