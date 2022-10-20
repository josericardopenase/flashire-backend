import React from "react"
import { Box } from "@chakra-ui/react"
import WorkingVehicle from "./components/WorkingVehicle"
import WorkingCenter from "./components/WorkingCenter"

export default function index() {
	return (
		<Box>
			<WorkingVehicle></WorkingVehicle>
			<WorkingCenter></WorkingCenter>
		</Box>
	)
}
