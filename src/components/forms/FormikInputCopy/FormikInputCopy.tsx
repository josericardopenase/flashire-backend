import { Button, Input, InputGroup, InputProps, InputRightElement, useClipboard } from "@chakra-ui/react"
import React from "react"
import FormikControl from "../FormikControl"

interface props extends InputProps {
	name: string
}

export default function FormikInputCopy({ ...props }: props) {
	return (
		<FormikControl {...props}>
			{(field) => {
				const { hasCopied, onCopy } = useClipboard(field.value)
				return (
					<InputGroup size="md">
						<Input {...field} disable />
						<InputRightElement width="5.5rem" p="2">
							<Button
								h="1.75rem"
								size="sm"
								onClick={() => {
									onCopy()
								}}
								colorScheme={hasCopied ? "brand" : "gray"}
							>
								{hasCopied ? "Copiado" : "Copiar"}
							</Button>
						</InputRightElement>
					</InputGroup>
				)
			}}
		</FormikControl>
	)
}
