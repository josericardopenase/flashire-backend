import { CircularProgress, CircularProgressProps, Icon } from "@chakra-ui/react"
import React from "react"
import { FaCheck, FaLock } from "react-icons/fa"

export default function ProcessStepper(props: CircularProgressProps) {
	const bgColor = props.value === 0 ? "gray.100" : props.value === 100 ? "green.500" : "transparent"
	const color = props.value === 100 ? "green.500" : "white"

	return (
		<CircularProgress
			size="40px"
			backgroundColor={bgColor}
			overflow="hidden"
			borderRadius="50%"
			color={color}
			thickness="12px"
			trackColor="whiteAlpha.300"
			display="flex"
			alignItems="center"
			justifyContent="center"
			{...props}
		>
			{props.value === 100 && <Icon color="white" as={FaCheck} w={4} h={4} position="absolute" />}
			{props.value === 0 && <Icon color="gray.500" as={FaLock} w={4} h={4} position="absolute" />}
		</CircularProgress>
	)
}
