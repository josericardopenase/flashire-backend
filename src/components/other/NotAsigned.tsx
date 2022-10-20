import { Button, Center, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons"
import { BiCar } from "react-icons/bi"

interface props {
	onClick: any
	label: string
	button?: string
	icon: IconType
}

export default function index({ onClick, label, button = "Agregar nuevo", icon }: props) {
	return (
		<Center
			cursor="pointer"
			_hover={{ bgColor: "gray.200" }}
			h="300px"
			borderColor="gray.300"
			borderWidth="2px"
			bgColor="gray.100"
			mt="7"
			borderRadius="18px"
			onClick={onClick}
		>
			<Flex alignItems="center" justifyContent="center" flexDirection="column">
				<Icon color="gray.500" mb="3" fontSize="50px" as={icon ?? BiCar}></Icon>
				<Text color="gray.500" fontWeight="semibold">
					{label}
				</Text>
				<Button colorScheme="brand" mt="4">
					{button}
				</Button>
			</Flex>
		</Center>
	)
}
