import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdCar } from "react-icons/io";

interface props {
	number: string;
	title: string;
	active: boolean;
	final?: boolean;
}

export default function Step({ number, title, active, final }: props) {
	const bgColor = active ? "white" : "transparent";
	const circleBgColor = active ? "white" : "brand.500";
	const color = active ? "gray.600" : "white";

	return (
		<Box
			cursor="pointer"
			my="10"
			fontWeight="semibold"
			bgColor={bgColor}
			color={color}
			zIndex="10"
			px="5"
			py={active ? "5" : "0"}
			borderRadius="2xl"
			boxShadow={active ? "lg.soft" : ""}
		>
			<Flex alignItems="center">
				<Center
					bgColor={circleBgColor}
					width="27px"
					height="27px"
					borderWidth="1px"
					borderColor={color}
					borderRadius="50%"
					mr="3"
				>
					{final ? <IoMdCar /> : <Text fontSize="sm">{number}</Text>}
				</Center>
				<Text fontSize="sm">{title}</Text>
			</Flex>
		</Box>
	);
}
