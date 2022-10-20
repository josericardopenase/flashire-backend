import { Box } from "@chakra-ui/react"
import React from "react"

export default function PageContainer({ children, detailed }: { children: any; detailed?: boolean }) {
	return (
		<Box p={16} pt="28" minH="100vh" bgColor={detailed ? "white" : ""}>
			{children}
		</Box>
	)
}
