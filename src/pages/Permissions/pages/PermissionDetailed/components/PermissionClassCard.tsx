import { PermissionService } from "@api/permissions"
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import ConfigurationMenu from "@components/menu/ConfigurationMenu"
import { PermissionClass } from "@wowtypes/db/permission"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"

interface props {
	permission_class: PermissionClass
}

export default function PermissionCard({ permission_class }: props) {
	const navigation = useNavigate()
	const { id } = useParams()

	return (
		<Flex
			onClick={() => navigation(`${permission_class.id}`)}
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
			<SimpleGrid columns={4} w="100%" alignItems="center">
				<Heading size="xs">{permission_class.name}</Heading>

				<Flex justifyContent="center">
					<Text color="gray.500" fontSize="xs">
						{permission_class.duration}m
					</Text>
				</Flex>
				<Flex justifyContent="center">
					<Box w="35px" h="15px" bgColor={permission_class.color} borderRadius="10px"></Box>
				</Flex>
				<Flex justifyContent="flex-end">
					<ConfigurationMenu
						position="relative"
						service={PermissionService.classes(parseInt(id ?? "0"))}
						id={permission_class.id}
					></ConfigurationMenu>
				</Flex>
			</SimpleGrid>
		</Flex>
	)
}
