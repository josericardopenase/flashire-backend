import { Box, Flex } from "@chakra-ui/react"
import React from "react"

interface props {
	show?: boolean
	children: React.ReactNode
}

export default function IconBadge({ show, children }: props) {
	return (
		<Flex position="relative" alignItems="center">
			<Box
				display={show ? "block" : "none"}
				m="-5px"
				borderWidth="2px"
				borderColor="gray.100"
				height="13px"
				width="13px"
				bgColor="brand.500"
				position="absolute"
				borderRadius="50%"
				top="0"
				right="0"
				zIndex="2"
			></Box>
			{children}
		</Flex>
	)
}
