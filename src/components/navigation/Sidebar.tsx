import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React from "react";

interface props extends BoxProps {
	children: React.ReactNode;
}

export function Sidebar({ children }: props) {
	return <Box h="100vh">{children}</Box>;
}
export function SidebarMenu({
	children,
	detail,
	title,
	onTitleClick,
	...props
}: props & {
	detail?: boolean;
	title?: string;
	onTitleClick?: () => any;
} & BoxProps) {
	return (
		<Box
			flex="1"
			h="100%"
			position="fixed"
			display={["none", "none", "none", "block", "block"]}
			width="300px"
			borderRightWidth="3px"
			borderColor="gray.100"
			{...props}
			overflow="hidden"
		>
			<Box mt="3" p="5">
				{children}
			</Box>
		</Box>
	);
}

export function SidebarContainer({ children, ...props }: props) {
	return (
		<SidebarContainerBase>
			<Flex p="10" justifyContent="center" alignItems="center">
				<Box w="100%" {...props}>
					{children}
				</Box>
			</Flex>
		</SidebarContainerBase>
	);
}

export function SidebarContainerBase({ children }: props) {
	return (
		<Box h="100%" ml={[0, 0, 0, "300px", "300px"]}>
			{children}
		</Box>
	);
}
