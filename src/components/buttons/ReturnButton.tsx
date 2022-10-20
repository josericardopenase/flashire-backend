import { Box, Icon, IconButton } from "@chakra-ui/react"
import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

export default function ReturnButton() {
	const navigate = useNavigate()
	return (
		<Box onClick={() => navigate(-1)}>
			<IconButton
				aria-label="go back"
				borderRadius="50%"
				size="md"
				mr={2}
				icon={<Icon color="gray.500" fontSize={"25px"} as={BiArrowBack}></Icon>}
			></IconButton>
		</Box>
	)
}
