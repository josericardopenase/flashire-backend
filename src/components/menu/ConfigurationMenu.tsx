import { BoxProps, Icon, IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import DeleteButton from "@components/buttons/DeleteButton"

import ApiService from "@davinci/ApiService"
import React from "react"
import { BiDotsHorizontalRounded } from "react-icons/bi"

interface props<Type> extends Omit<BoxProps, "id"> {
	id: number
	service: ApiService<Type & { id?: number }>
}

export default function ConfigurationMenu<Type>({ service, id, ...props }: props<Type>) {
	const { mutateAsync } = service.useDestroy()

	return (
		<Menu>
			<MenuButton
				zIndex="10"
				fontSize="20px"
				borderRadius="50%"
				position={props.position ?? "absolute"}
				m="3"
				right="0"
				top="0"
				as={IconButton}
				icon={<Icon as={BiDotsHorizontalRounded}></Icon>}
				onClick={(e) => e.stopPropagation()}
			/>
			<MenuList>
				<DeleteButton menu aria-label="delete" deleteFunction={() => mutateAsync(id)}></DeleteButton>
			</MenuList>
		</Menu>
	)
}
