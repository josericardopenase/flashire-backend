import { Box, HStack, Text } from "@chakra-ui/react"
import React from "react"
import { Link, useLocation } from "react-router-dom"

export interface ITab {
	title: string
	href: string
}

interface props extends React.HTMLProps<HTMLDivElement> {
	tabs: ITab[]
}

function Tab({ obj }: { obj: ITab }) {
	const location = useLocation()
	const activate = location.pathname.includes(obj.href)

	return (
		<Link to={obj.href} replace={true}>
			<Box position="relative">
				<Text fontSize="md" fontWeight="semibold" color={activate ? "gray.900" : "gray.500"} _hover={{ color: "gray.900" }}>
					{obj.title}
				</Text>
				{activate && <Box height="3px" width="40px" bgColor="brand.500" mt="12px" position="absolute" zIndex={3}></Box>}
			</Box>
		</Link>
	)
}

export default function HorizontalNavigation({ tabs }: props) {
	return (
		<Box as="nav" mt="4" mb="4" width="100%">
			<HStack width="100%" spacing="10" mb={3}>
				{tabs.map((x, i) => (
					<Tab key={i} obj={x}></Tab>
				))}
			</HStack>
			<Box height="3px" width="100%" bgColor="gray.200" position="relative"></Box>
		</Box>
	)
}
