import { Box, Heading, Image, Text } from "@chakra-ui/react"
import { Vehicle } from "@wowtypes/db/vehicles"
import React from "react"

interface props {
	vehicle: Vehicle
	secondary?: boolean
}

export default function VehicleGenericCard({ vehicle, secondary }: props) {
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
