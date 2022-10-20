import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import React from "react"

interface props {
	title?: string
	subtitle?: string
	onClose: () => void
	isOpen: boolean
	loading?: boolean
	close: () => void
	setIsOpen: (value: boolean) => void
}

export default function DeleteModal({
	onClose,
	isOpen,
	close,
	setIsOpen,
	title = "Eliminar recurso",
	subtitle = "¿Estás seguro? No podrás rehacer esta acción después",
	loading = false,
}: props) {
	const cancelRef = React.useRef<any>()

	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>{subtitle}</AlertDialogBody>

					<AlertDialogFooter>
						<Button onClick={close}>Cancelar</Button>
						<Button colorScheme="red" onClick={onClose} ml={3} isLoading={loading}>
							Eliminar
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
