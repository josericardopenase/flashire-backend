import { Text } from "@chakra-ui/react"
import React from "react"

interface Props {
	error: string
	showError: boolean
}

export default function FormikError({ error, showError }: Props) {
	return showError ? (
		<Text color="brand.500" mt={2}>
			* {error}
		</Text>
	) : null
}
