import { Box, Heading, Image, Text } from "@chakra-ui/react"
import { Office } from "@wowtypes/db/offices"
import React from "react"

interface props {
	office: Office
	secondary?: boolean
}

export default function OfficeCard({ office, secondary }: props) {
	return (
		<Box w="100%" position="relative">
			<Box
				bgColor={secondary ? "gray.50" : "white"}
				_hover={{ bgColor: secondary ? "gray.100" : "gray.50" }}
				w="100%"
				borderRadius="20px"
				cursor="pointer"
				transition="0.5s all ease"
				overflow="hidden"
				position="relative"
				role="group"
			>
				<Image objectFit={"cover"} transition="0.5s all ease" src={office.thumbnail} height="200px" width="100%"></Image>
				<Box p="6">
					<Heading size="md">{office.name}</Heading>
					<Text fontSize="md" mt="2" color="gray.500">
						{office.ubication}
					</Text>
				</Box>
			</Box>
		</Box>
	)
}
