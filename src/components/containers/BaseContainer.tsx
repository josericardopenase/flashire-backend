import { BoxProps, Container } from "@chakra-ui/react"
import React from "react"

export default function BaseContainer({ children, ...props }: { children: JSX.Element; maxW?: string } & BoxProps) {
	return (
		<Container pt="93px" mb={5} {...props}>
			{children}
		</Container>
	)
}
