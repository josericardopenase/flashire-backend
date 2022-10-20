import EmployeeService from "@api/users/employees"
import { Avatar, Flex, Heading } from "@chakra-ui/react"
import ReturnButton from "@components/buttons/ReturnButton"
import PageContainer from "@components/containers/PageContainer"
import HorizontalNavigation from "@components/navigation/HorizontalNavigation"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import React from "react"
import { Outlet, useParams } from "react-router-dom"

export default function index() {
	const { id } = useParams()
	const { data, status } = EmployeeService.useRetrieve(id)

	return (
		<DavinciLoader status={status}>
			<PageContainer detailed>
				<Flex alignItems="center" mb="5">
					<ReturnButton></ReturnButton>
					<Avatar mr="3" ml="3" src={data?.avatar}></Avatar>
					<Heading>
						{data?.first_name} {data?.last_name}
					</Heading>
				</Flex>
				<HorizontalNavigation
					tabs={[
						{
							title: "Resumen",
							href: "",
						},
						{
							title: "Configuración",
							href: "config",
						},
					]}
				></HorizontalNavigation>

				<Outlet></Outlet>
			</PageContainer>
		</DavinciLoader>
	)
}
