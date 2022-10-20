import { Box, BoxProps } from "@chakra-ui/react"
import React from "react"

export default function BaseCard(props: BoxProps) {
	return (
		<Box width="100%" height="100%" {...props}>
			{props.children}
		</Box>
	)
}
