import React from "react"
import EmployeeService from "@api/users/employees"
import { Avatar, Box, Flex, Heading, Tag, Text, Tooltip } from "@chakra-ui/react"
import ConfigurationMenu from "@components/menu/ConfigurationMenu"
import { User } from "@wowtypes/db/users"
import { useNavigate } from "react-router-dom"
import { ROLES } from "@utils/constants/roles.constants"
import LogoHolded from "@assets/LogoHolded"

interface props {
	employee: User
}

export default function EmployeeCard({ employee }: props) {
	const navigation = useNavigate()
	const role = ROLES.find((x) => x.value === employee.role)

	return (
		<Flex
			onClick={() => navigation(`${employee.id}`)}
			w="100%"
			position="relative"
			bgColor="white"
			px="5"
			py="3"
			alignItems="center"
			_hover={{ bgColor: "gray.50" }}
			justifyContent="space-between"
			borderRadius="xl"
			cursor="pointer"
		>
			<Flex alignItems="center">
				<Avatar name={employee.first_name + " " + employee.last_name} src={employee.avatar}></Avatar>
				<Box ml="4" onClick={() => navigation(`${employee.id}`)}>
					<Heading size="xs">
						{employee.first_name} {employee.last_name}
					</Heading>
					<Text color="gray.500" fontSize="xs">
						{employee.email}
					</Text>
				</Box>
				<Tag ml="5" colorScheme={role?.color} fontWeight="semibold">
					{role?.value}
				</Tag>
			</Flex>
			<Flex alignItems="center">
				<Tooltip label={employee.has_holded_profile ? "Sincronizdo con holded" : "No sincronizado con holded"} color="white">
					<Box bgColor="gray.100" p="2" borderRadius="50%">
						<LogoHolded size={10} color={employee.has_holded_profile ? "#FD454D" : "gray"}></LogoHolded>
					</Box>
				</Tooltip>
				<ConfigurationMenu position="relative" service={EmployeeService} id={employee.id}></ConfigurationMenu>
			</Flex>
		</Flex>
	)
}
