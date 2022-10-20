import OfficeService from "@api/offices"
import { Flex, Heading } from "@chakra-ui/react"
import ReturnButton from "@components/buttons/ReturnButton"
import PageContainer from "@components/containers/PageContainer"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import React from "react"
import { useParams } from "react-router-dom"

export default function OfficeDetailed() {
	const { id } = useParams()
	const { data, status } = OfficeService.useRetrieve(id)

	return (
		<DavinciLoader status={status}>
			<PageContainer detailed>
				<Flex alignItems="center" mb="5">
					<ReturnButton></ReturnButton>
					<Heading>{data?.name}</Heading>
				</Flex>
			</PageContainer>
		</DavinciLoader>
	)
}
