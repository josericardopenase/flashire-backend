import { PermissionService } from "@api/permissions"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import ConfigurationMenu from "@components/menu/ConfigurationMenu"
import { Permission } from "@wowtypes/db/permission"
import React from "react"
import { useNavigate } from "react-router-dom"

interface props {
	permission: Permission
}

export default function PermissionCard({ permission }: props) {
	const navigation = useNavigate()

	return (
		<Flex
			onClick={() => navigation(`${permission.id}`)}
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
				<Box ml="4" onClick={() => navigation(`${permission.id}`)}>
					<Heading size="xs">{permission.name}</Heading>
					<Text color="gray.500" fontSize="xs">
						Nombre dgt: {permission.dgt_name}
					</Text>
				</Box>
			</Flex>
			<Flex alignItems="center">
				<ConfigurationMenu position="relative" service={PermissionService} id={permission.id}></ConfigurationMenu>
			</Flex>
		</Flex>
	)
}
