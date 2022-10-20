import { chakra, Flex } from "@chakra-ui/react"
import { isValidMotionProp } from "framer-motion"

const ChakraBox = chakra(Flex, {
	shouldForwardProp: isValidMotionProp,
})

export default ChakraBox
