import OfficeService from "@api/offices"
import { Box, Heading, Image, Text } from "@chakra-ui/react"
import ConfigurationMenu from "@components/menu/ConfigurationMenu"
import { Office } from "@wowtypes/db/offices"
import React from "react"
import { useNavigate } from "react-router-dom"

interface props {
	office: Office
}

export default function OfficeCard({ office }: props) {
	const navigation = useNavigate()

	return (
		<Box w="100%" position="relative">
			<ConfigurationMenu service={OfficeService} id={office.id}></ConfigurationMenu>
			<Box
				onClick={() => navigation(`${office.id}`)}
				bgColor="white"
				w="100%"
				borderRadius="20px"
				cursor="pointer"
				_hover={{ bgColor: "gray.50" }}
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
