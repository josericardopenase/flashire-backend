import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FormikInput } from "@components/forms"
import FormikToggle from "@components/forms/FormikSwitch"
import React from "react"

export default function Day({ name }: { name: string }) {
	return (
		<Box w="100%" bgColor="gray.50" p="3" borderRadius="20px">
			<Flex justifyContent="space-between" alignItems="center">
				<Flex>
					<FormikToggle size="sm" name={name} colorScheme="brand"></FormikToggle>
					<Heading ml="3" fontSize="sm">
						{name}
					</Heading>
				</Flex>
				<Flex alignItems="center" color="gray.500">
					<Text mr="3">de</Text>
					<FormikInput size="sm" variant="primary" mr="3" name={name + "_start"} type="time"></FormikInput>
					<Text mr="3">a</Text>
					<FormikInput size="sm" variant="primary" name={name + "_finish"} type="time"></FormikInput>
				</Flex>
			</Flex>
		</Box>
	)
}
