import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Menu, MenuButton, MenuButtonProps, MenuList } from "@chakra-ui/react"
import React from "react"

type props = MenuButtonProps

export default function FormikAddFilters(props: props) {
	return (
		<Menu>
			<MenuButton as={Button} variant="primary" mr={2} color="gray.500" width="fit-content" minW="fit-content" rightIcon={<ChevronDownIcon />}>
				Añadir Filtros
			</MenuButton>
			<MenuList>{props.children}</MenuList>
		</Menu>
	)
}
