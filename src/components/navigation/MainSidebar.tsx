import Logo from "@assets/Logo"
import { As, Box, BoxProps, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { Link, useLocation } from "react-router-dom"

interface props extends BoxProps {
	children: React.ReactNode
}

export function Sidebar({ children }: props) {
	return <Box h="100vh">{children}</Box>
}

export function SidebarDivider() {
	return <Box w="100%" h="1px" my="5" bgColor="whiteAlpha.200"></Box>
}

export function SidebarTitle({ name }: { name: string }) {
	return (
		<Box my="5" color="whiteAlpha.900">
			<Text fontSize="sm">{name}</Text>
		</Box>
	)
}

export function SidebarElement({ href, name, icon }: { href: string; name: string; icon: As<any> }) {
	const location = useLocation()
	const color = location.pathname.split("/")[1].includes(href.split("/")[1]) ? "whiteAlpha.900" : "whiteAlpha.700"
	const bgColor = location.pathname.split("/")[1].includes(href.split("/")[1]) ? "whiteAlpha.300" : "brand.500"
	const hoverBgColor = location.pathname.split("/")[1].includes(href.split("/")[1]) ? "whiteAlpha.400" : "whiteAlpha.400"

	return (
		<Link to={href}>
			<Flex
				transition="0.25s ease all"
				mt="2"
				alignItems="center"
				fontSize="20px"
				color={color}
				bgColor={bgColor}
				px="2"
				py="2"
				borderRadius="lg"
				_hover={{ bgColor: hoverBgColor }}
				fontWeight="medium"
			>
				<Icon mr="2" as={icon}></Icon>
				<Text fontSize="16px">{name}</Text>
			</Flex>
		</Link>
	)
}

export function SidebarMenu({
	children,
	detail,
	title,
	onTitleClick,
	...props
}: props & {
	detail?: boolean
	title?: string
	onTitleClick?: () => any
} & BoxProps) {
	return (
		<Box
			zIndex="300"
			flex="1"
			h="100%"
			position="fixed"
			display={["none", "none", "none", "block", "block"]}
			width="270px"
			borderRightWidth="2px"
			bgColor="brand.500"
			borderColor="gray.100"
			{...props}
			overflow="hidden"
		>
			<Box mt="3" p="5">
				<Logo width={160} color="white"></Logo>
				<Box mt="12">{children}</Box>
			</Box>
		</Box>
	)
}

export function SidebarContainer({ children, ...props }: props) {
	return (
		<SidebarContainerBase>
			<Flex justifyContent="center" alignItems="center" zIndex="300">
				<Box w="100%" {...props}>
					{children}
				</Box>
			</Flex>
		</SidebarContainerBase>
	)
}

export function SidebarContainerBase({ children }: props) {
	return (
		<Box h="100%" ml={[0, 0, 0, "270px", "270px"]}>
			{children}
		</Box>
	)
}
