import VehicleService from "@api/vehicles"
import { Box, Heading, Image, Text } from "@chakra-ui/react"
import ConfigurationMenu from "@components/menu/ConfigurationMenu"
import { Vehicle } from "@wowtypes/db/vehicles"
import React from "react"
import { useNavigate } from "react-router-dom"

interface props {
	vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: props) {
	const navigation = useNavigate()

	return (
		<Box w="100%" position="relative">
			<ConfigurationMenu service={VehicleService} id={vehicle.id}></ConfigurationMenu>
			<Box
				onClick={() => navigation(`${vehicle.id}`)}
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
				<Image objectFit={"cover"} transition="0.5s all ease" src={vehicle.thumbnail} height="200px" width="100%"></Image>
				<Box p="6">
					<Heading size="md">{vehicle.plate_number}</Heading>
					<Text color="gray.600">
						{vehicle.brand} {vehicle.model}
					</Text>
				</Box>
			</Box>
		</Box>
	)
}
