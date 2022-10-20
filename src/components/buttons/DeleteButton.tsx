import { IconButton, IconButtonProps, MenuItem } from "@chakra-ui/react"
import DeleteModal from "@components/modals/ModalDelete"
import React, { useState } from "react"
import { BiTrash } from "react-icons/bi"

interface props extends IconButtonProps {
	deleteFunction: (...args: any) => unknown
	isLoading?: boolean
	menu?: boolean
	label?: string
	icon?: any
}

export default function DeleteButton({ deleteFunction, isLoading, menu, label, icon = null }: props) {
	const [show, setShow] = useState(false)
	const Icon = icon ?? BiTrash

	return (
		<>
			{menu ? (
				<MenuItem
					color="red.500"
					onClick={(e) => {
						setShow(true)
						e.stopPropagation()
					}}
				>
					Eliminar
				</MenuItem>
			) : (
				<IconButton
					borderRadius="50%"
					aria-label="eliminar link"
					fontSize="20px"
					color="red.500"
					icon={<Icon />}
					mr={2}
					onClick={(e) => {
						setShow(true)
						e.stopPropagation()
					}}
				/>
			)}
			<DeleteModal
				setIsOpen={setShow}
				isOpen={show}
				close={() => setShow(false)}
				loading={isLoading}
				onClose={async () => {
					await deleteFunction()
					setShow(false)
				}}
			></DeleteModal>
		</>
	)
}
