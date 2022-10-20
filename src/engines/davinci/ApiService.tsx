import toast from "react-hot-toast"
import { QueryFunctionContext, UseBaseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions } from "react-query"
import api from "./clients/apiClient"
import queryClient from "./clients/queryClient"
import { $iQuery, $mutation, $query } from "./DaVinci"
import { configurations, listApiResponse, mutateOptions } from "./types/apitypes"

import { ApiError } from "./types/error"

//https://stackoverflow.com/questions/70255761/how-to-dynamically-add-methods-to-an-object-in-typescript important
interface Builder<TStore, TType = Record<string, never>> {
	add<TName extends string, TArg>(
		key: TName,
		action: (store: TStore, param: TArg) => void
	): Builder<TStore, TType & { [key in TName]: (param: TArg) => void }>
	build: () => TType
}

/*

MOTOR FIXME:

	.addQuery() ?detailed /brands/12/detailed : /brands/nondetailed/
	.addCRUD() ?detailed /brands/12/tasks ["brands", 12, "tasks", ]: /brands/tasks/
- add custom endpoints more away than crud EJ: /brands/billing_data/
			DEFINE:
		- typed object
		- extra_url : "extra route for that"
		- action : "POST" , "PUT"
		- configurations
- add custom endpoints more away than crud EJ: /brands/12/billing_data/
	DEFINE:
		- typed object
		- extra_url : "extra route for that"
		- action : "POST" , "PUT"
		- configurations
- add custom nested CRUDS: /brands/12/tasks/
	INPUT:
		- id of element
	
	DEFINE:
		- 
	 	- typed_object

*/

export default class ApiService<Type extends { id?: number }> {
	public queryKey: string[]
	protected url: string
	protected config?: any

	constructor(queryKey: string | string[], url: string, config?: configurations) {
		this.queryKey = typeof queryKey === "string" ? [queryKey] : queryKey
		this.url = url
		this.config = config
	}

	public async removeCache() {
		await queryClient.invalidateQueries([...this.queryKey])
	}

	private getPrimaryKey(data: Partial<Type> | Type) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/* @ts-ignore */
		return data[this.config?.pk ?? "id"]
	}

	private async getElementFun(id: number | string, filters?: any, extra_route?: string) {
		const response = await api.get<any>(this.url + id + "/" + extra_route, filters)

		if (response.ok) return response.data

		throw response.data
	}

	private async getInfiniteFun(pageParam = 1, filters: Record<string, string>): Promise<listApiResponse<Type>> {
		/*
		Se implementan los filtros aqui
		*/

		const response = await api.get<listApiResponse<Type>, ApiError>(this.url, {
			page_size: this.config?.pageSize ?? 20,
			page: pageParam,
			...filters,
		})

		if (response.ok && response.data) return response.data

		throw response.data
	}

	protected async getFun(filters?: any): Promise<listApiResponse<Type>> {
		/*
		Se implementan los filtros aqui
		*/
		const response = await api.get<listApiResponse<Type>, ApiError>(this.url, filters)

		if (response.ok && response.data) return response.data

		throw response.data
	}

	protected async postFun(data: Type): Promise<Type> {
		const response = await api.post<Type, ApiError>(this.url, data)

		if (response.ok && response.data) return response.data

		throw response.data
	}

	protected async destroyFun(id: number | string) {
		const response = await api.delete<Type, ApiError>(this.url + id + "/")

		//FIXME: EL BACK DEBERÍA DEVOLVER EL OBJETO ELIMINADO
		if (response.ok) return response.data

		throw response.data
	}

	protected async updateFun(data: Partial<Type>): Promise<Type> {
		const response = await api.patch<Type, ApiError>(this.url + this.getPrimaryKey(data) + "/", data)

		if (response.ok && response.data) return response.data

		throw response.data
	}

	private _paginatedList(filters?: unknown): UseInfiniteQueryOptions<listApiResponse<Type>, ApiError> {
		/**
		 *
		 * TIPOS:
		 * {
		 * 	next : number,
		 * 	list : type[],
		 * }
		 *
		 */

		return {
			...this.config,
			queryKey: filters ? [...this.queryKey, "paginatedList", filters] : [...this.queryKey, "paginatedList"],
			queryFn: (context: QueryFunctionContext<any>) => this.getInfiniteFun(context.pageParam, context.queryKey[context.queryKey.length - 1]),
			keepPreviousData: true,
			getNextPageParam: (lastPage) => (lastPage.results.length < (this.config?.pageSize ?? 20) ? undefined : lastPage.next ?? false),
			getPreviousPageParam: (firstPage) => firstPage.previous ?? false,
		}
	}

	private _list(filters?: any): UseQueryOptions<listApiResponse<Type>, ApiError> {
		/**
		 * TIPOS:
		 * {
		 * 	list : Type[]
		 * }
		 */

		return {
			...this.config,
			queryKey: filters ? [...this.queryKey, "list", filters] : [...this.queryKey, "list"],
			queryFn: (context: QueryFunctionContext<any>) => this.getFun(context.queryKey[filters ? 2 : 1]),
			keepPreviousData: true,
		}
	}

	private _retrieve(id: number | string | undefined, filters?: any, extra_route = "") {
		const queryKey = [...this.queryKey, "detail", id, ...(filters ? [filters] : []), ...(extra_route ? [extra_route] : [])]

		return {
			...this.config,
			queryKey: queryKey,
			queryFn: (context: QueryFunctionContext<any>) => this.getElementFun(id ?? "", filters, extra_route),
		}
	}

	private _create(): mutateOptions<Type, ApiError, Type> {
		return {
			mutationFn: (data: Type) => this.postFun(data),
			onSuccess: async (obj) => {
				this.performCreate(obj)
			},
			onError: (obj) => {
				toast.error("Error inesperado: no se ha podido crear el elemento")
			},
		}
	}

	private _update(): mutateOptions<Type, ApiError, Partial<Type>> {
		return {
			mutationFn: (data: Partial<Type>) => this.updateFun(data),
			onSuccess: async (obj) => {
				toast.success("Elemento actualizado con éxito")
				this.performUpdate(obj)
			},
			onError: (obj) => {
				toast.error("Error inesperado: no se ha podido actualizar el elemento")
			},
		}
	}

	private _destroy(): UseMutationOptions<any, ApiError, number | string, unknown> {
		return {
			mutationFn: (data: number | string) => this.destroyFun(data),
			onSuccess: (obj) => {
				console.log(obj)
				toast.success("Elemento eliminado con éxito")
				this.performDestroy(obj)
			},
			onError: (obj) => {
				toast.error("Error inesperado: no se ha podido eliminar el elemento")
			},
		}
	}

	public async invalidateQueries() {
		await queryClient.invalidateQueries([...this.queryKey])
	}

	protected async performCreate(obj: Type) {
		await queryClient.invalidateQueries([...this.queryKey, "list"])
		await queryClient.invalidateQueries([...this.queryKey, "paginatedList"])
	}

	protected async performUpdate(obj: Type) {
		await queryClient.setQueryData([...this.queryKey, "detail", obj.id?.toString()], (old: any) => ({ ...old, ...obj }))
		try {
			await queryClient.setQueriesData([...this.queryKey, "paginatedList"], (oldData: any) => {
				return {
					...oldData,
					pages: oldData.pages.map((x: any) => ({ ...x, list: x.list.map((y: Type) => (y.id === obj.id ? { ...y, ...obj } : y)) })),
				}
			})
		} catch (e) {
			console.log("error")
		}
		await queryClient.invalidateQueries([...this.queryKey, "paginatedList"])
		await queryClient.invalidateQueries([...this.queryKey, "list"])
	}

	protected async performDestroy(obj: Type) {
		try {
			await queryClient.invalidateQueries([...this.queryKey, "list"])
		} catch (e) {
			throw Error("problema al actualizar la paginated list")
		}

		try {
			await queryClient.setQueriesData([...this.queryKey, "paginatedList"], (oldData: any) => {
				console.log(obj.id)
				oldData.pages.map((x: any) => console.log({ ...x, list: x.list.filter((y: Type) => y.id !== obj.id) }))
				return { ...oldData, pages: oldData.pages.map((x: any) => ({ ...x, list: x.list.filter((y: Type) => y.id !== obj.id) })) }
			})
		} catch (e) {
			await queryClient.invalidateQueries([...this.queryKey, "paginatedList"])
		}
	}

	get useList() {
		/**
		 * TIPOS:
		 * {
		 * 	list : Type[]
		 * }
		 */

		return (filters?: any) => $query<listApiResponse<Type>, ApiError>(this._list(filters))
	}

	get useRetrieve() {
		/**
		 * TIPOS:
		 * {
		 * 	list : Type[]
		 * }
		 */

		return (id: number | string | undefined, filters?: any, extra_route = "", configurations?: UseBaseQueryOptions) =>
			$query<Type>({ ...this._retrieve(id, filters, extra_route), ...configurations })
	}

	get usePaginatedList() {
		/**
		 * TIPOS:
		 * {
		 * 	list : Type[]
		 * }
		 */

		return (filters?: any) => $iQuery<listApiResponse<Type>, ApiError>(this._paginatedList(filters))
	}

	get useCreate() {
		/**
		 * TIPOS:
		 * {
		 * 	...Type
		 * }
		 */

		return () => $mutation(this._create())
	}

	get useUpdate() {
		/**
		 * TIPOS:
		 * {
		 * 	...Type
		 * }
		 */

		return () => $mutation(this._update())
	}

	get useDestroy() {
		/**
		 * TIPOS:
		 * {
		 * 	...Type
		 * }
		 */

		return () => $mutation(this._destroy())
	}

	public addQuery<Type>(name: string | string[], endpoint: string) {
		return (filters?: unknown) =>
			$query<Type, ApiError>({
				...this.config,
				queryKey: filters
					? [...this.queryKey, "list", ...(typeof name === "string" ? [name] : name), filters]
					: [...this.queryKey, "list", ...(typeof name === "string" ? [name] : name)],
				queryFn: async (context: QueryFunctionContext<any>) => {
					const response = await api.get<Type, ApiError>(
						this.url + endpoint,
						filters ? context.queryKey[this.queryKey.length + name.length + 1] : {}
					)

					if (response.ok) return response.data

					throw response.data
				},
				keepPreviousData: true,
			})
	}

	public addMutation<Type>(url: string, options?: mutateOptions<Type, ApiError, Type>) {
		return $mutation({
			mutationFn: async (data: Type) => {
				const response = await api.post<Type, ApiError>(this.url + url, data)

				if (response.ok && response.data) return response.data

				throw response.data
			},
			onError: (obj) => {
				toast.error("Error inesperado: no se ha podido crear el elemento")
			},
			...options,
		})
	}
	public addDetailedMutation<Type>(url: string, options?: mutateOptions<Type, ApiError, Type>) {
		return (id: number | string) =>
			$mutation({
				mutationFn: async (data: Type) => {
					const response = await api.post<Type, ApiError>(this.url + id + url, data)

					if (response.ok && response.data) return response.data

					throw response.data
				},
				onError: (obj) => {
					toast.error("Error inesperado: no se ha podido crear el elemento")
				},
				...options,
			})
	}

	addCrud<Type extends { id?: number }>(name: string, url: string, options?: configurations) {
		return new ApiService<Type>([...this.queryKey, name], url, options ?? {})
	}

	addDetailedCrud<Type extends { id?: number }>(name: string, url: string, options?: configurations) {
		return (id: number | string) => new ApiService<Type>([...this.queryKey, id.toString(), name], `${this.url}${id}${url}`, options ?? {})
	}
}
