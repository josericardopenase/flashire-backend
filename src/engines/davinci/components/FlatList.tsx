import { SimpleGrid, BoxProps, Box, Center, Spinner, Heading, Icon, Flex, Text } from "@chakra-ui/react"
import FormikFilters from "@components/forms/FormikFilters"
import Skeleton, { SkeletonProps } from "@components/other/Skeleton/Skeleton"
import React, { useState } from "react"
import { BiError } from "react-icons/bi"
import { IoIosWarning } from "react-icons/io"
import InfiniteScroll from "react-infinite-scroll-component"
import ApiService from "../ApiService"

const NotFound = () => (
	<Center>
		<Flex flexDir="column" justifyContent="center" alignItems="center" pt="110px" pb="110px">
			<Icon color="gray.300" as={IoIosWarning} fontSize="80px"></Icon>
			<Heading size="md" mt={4} fontWeight="semibold" textAlign="center" color="gray.500">
				No se han encontrado resultados o el<br></br>espacio de trabajo esta vacío
			</Heading>
		</Flex>
	</Center>
)

const Loading = () => (
	<Center>
		<Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDir="column" pb="110px" pt="110px">
			<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="brand.500" size="xl" />
			<Heading size="md" mt={4} fontWeight="semibold">
				Cargando datos...
			</Heading>
		</Box>
	</Center>
)

const Error = () => (
	<Center>
		<Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDir="column" pb="110px" pt="110px">
			<Icon fontSize="60px" color="red.500" as={BiError}></Icon>
			<Heading size="lg" mt={4} fontWeight="semibold">
				Oh no!
			</Heading>
			<Text mt="4" color="gray.500">
				Ha ocurrido un error inesperado. Vuelva a intentarlo mas tarde.
			</Text>
		</Box>
	</Center>
)

export interface FlatListProps<Type extends { id?: number }> extends Omit<BoxProps, "children"> {
	apiService: ApiService<Type>
	children: (component: Type, index: number, list: Type[]) => JSX.Element
	cols?: number | number[]
	spacing?: number
	filterForm?: React.ReactNode
	height?: string | number
	skeleton?: SkeletonProps
	initialFilters?: any
	NotFoundComponent?: JSX.Element
	LoadingComponent?: JSX.Element
	ErrorComponent?: JSX.Element
	AddButton?: React.ReactNode
}

export default function FlatList<Type extends { id?: number }>({
	apiService,
	cols = 1,
	spacing = 3,
	children,
	filterForm,
	height,
	skeleton,
	initialFilters = {},
	NotFoundComponent = <NotFound></NotFound>,
	LoadingComponent = <Loading></Loading>,
	ErrorComponent = <Error></Error>,
	AddButton,
	...boxProps
}: FlatListProps<Type>) {
	const [filters, setFilters] = useState<unknown>({ ...initialFilters })
	const [filterLoading, setFilterLoading] = useState<unknown>(false)
	const { data, status, fetchNextPage, hasNextPage, remove, isRefetching, isFetchingNextPage } = apiService.usePaginatedList(filters)
	const listData = data?.pages.map((x) => x.results.map((y) => y)).flat(1)

	const sk = (
		<Box {...boxProps}>
			<Skeleton cols={cols} spacing={spacing} {...skeleton}></Skeleton>
		</Box>
	)
	if (status === "error") return ErrorComponent

	return (
		<>
			<FormikFilters initialValues={{ ...initialFilters }} setLoading={setFilterLoading} setFilters={setFilters}>
				{filterForm}
			</FormikFilters>

			{isRefetching && !isFetchingNextPage ? (
				sk
			) : status === "loading" ? (
				LoadingComponent
			) : (listData?.length ?? 0) < 1 && !AddButton ? (
				NotFoundComponent
			) : (
				<Box {...boxProps}>
					<InfiniteScroll
						dataLength={listData?.length ?? 0}
						next={fetchNextPage}
						style={{ width: "100%" }}
						hasMore={hasNextPage ?? false}
						loader={sk}
						{...(height ? { height: height } : {})}
					>
						<SimpleGrid columns={cols} spacing={spacing}>
							{AddButton}
							{listData?.map((x, i, l) => children(x, i, l))}
						</SimpleGrid>
					</InfiniteScroll>
				</Box>
			)}
		</>
	)
}
