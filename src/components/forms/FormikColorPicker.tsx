import { Box, InputProps, SimpleGrid, Flex, Icon } from "@chakra-ui/react"
import React from "react"
import { FaCheck } from "react-icons/fa"
import FormikControl, { FormikBase } from "./FormikControl"

interface props extends InputProps, FormikBase {
	name: string
}

export default function FormikColorPicker({ ...props }: props) {
	const colors = ["rgb(0, 121, 191)", "rgb(210, 144, 52)", "rgb(81, 152, 57)", "rgb(176, 70, 50)", "rgb(137, 96, 158)"]

	return (
		<FormikControl {...props} mt="3">
			{(field, meta, helpers) => (
				<SimpleGrid columns={5} spacing="3">
					{colors.map((x, i) => (
						<Flex justifyContent="center" alignItems="center" key={i} onClick={() => helpers.setValue(x)} cursor="pointer">
							{field.value === x && <Icon position="absolute" fontSize="10px" as={FaCheck} color="white"></Icon>}
							<Box borderRadius="md" height="30px" w="100%" bgColor={x} filter={{ brightness: "0.5" }} />
						</Flex>
					))}
				</SimpleGrid>
			)}
		</FormikControl>
	)
}
/*


*/
