import { CircularProgress, CircularProgressProps, Icon } from "@chakra-ui/react"
import React from "react"
import { FaCheck, FaLock } from "react-icons/fa"

interface props extends CircularProgressProps {
	checkBgColor?: string
	bgColor?: string
	lockBgColor?: string
	disableLockIcon?: boolean
	disableCheckIcon?: boolean
	borderColor?: string
	trackColor?: string
	isFill?: boolean
	trackLockColor?: string
}

export default function ProcessStepper({
	checkBgColor = "green.400",
	bgColor = "transparent",
	lockBgColor = "gray.300",
	disableLockIcon = false,
	disableCheckIcon = false,
	borderColor = "brand.500",
	trackColor = "gray.100",
	trackLockColor = "gray.300",
	isFill = false,
	...props
}: props) {
	console.log(props.value)
	const bgcolor = props.value === 0 ? lockBgColor : props.value === 100 ? checkBgColor : bgColor
	const color = props.value === 100 ? checkBgColor : props.value === 0 ? "transparent" : borderColor
	const track = props.value === 0 ? trackLockColor : props.value === 100 ? "transparent" : trackColor

	return (
		<CircularProgress
			size="40px"
			backgroundColor={bgcolor}
			overflow="hidden"
			borderRadius="50%"
			color={color}
			thickness={isFill ? "80px" : "12px"}
			trackColor={track}
			minWidth="30px"
			display="flex"
			alignItems="center"
			justifyContent="center"
			{...props}
		>
			{props.value === 100 && !disableCheckIcon && <Icon color="white" as={FaCheck} w={4} h={4} position="absolute" />}
			{props.value === 0 && !disableLockIcon && <Icon color="gray.500" as={FaLock} w={4} h={4} position="absolute" />}
		</CircularProgress>
	)
}
