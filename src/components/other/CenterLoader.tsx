import { Center, Spinner } from "@chakra-ui/react"
import React from "react"

export default function CenterLoader() {
	return (
		<Center height="100vh">
			<Spinner color="brand.500" size="lg"></Spinner>
		</Center>
	)
}
