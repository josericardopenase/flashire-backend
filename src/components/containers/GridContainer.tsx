import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface props {
	title?: string;
	children?: React.ReactNode;
	right?: React.ReactNode;
}

export const DividerWoW = () => <Box height="2px" bgColor="gray.100"></Box>;

export default function GridContainer({ title, children, right }: props) {
	return (
		<Box bgColor="white" borderRadius="2xl" py={8}>
			<Box px={8}>
				<Flex alignItems="center" justifyContent="space-between" mb={6}>
					{title && (
						<Text fontWeight="semibold" fontSize="lg">
							{title}
						</Text>
					)}
					<Flex alignItems="center" justifyContent="space-between">
						{right}
					</Flex>
				</Flex>
			</Box>
			<Box height="2px" bgColor="gray.100"></Box>
			<Box>{children}</Box>
		</Box>
	);
}
