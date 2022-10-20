import { Box, SimpleGrid } from "@chakra-ui/react"
import React from "react"

interface props {
	side: number
	color?: string
	size?: number
}

export default function Square({ side, color = "white", size = 2 }: props) {
	return (
		<SimpleGrid columns={side} gap={2}>
			{new Array(side * side).fill(0).map((x, i) => (
				<Box borderRadius="50%" bgColor={color} width={size} height={size} key={i}></Box>
			))}
		</SimpleGrid>
	)
}
