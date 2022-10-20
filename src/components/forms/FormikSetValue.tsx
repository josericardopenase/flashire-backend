import { Box, BoxProps } from "@chakra-ui/react"
import { useField } from "formik"
import React from "react"

interface props extends BoxProps {
	name: string
	value: unknown
	children: React.ReactNode
}

export default function FormikSetValue({ name, value, children, ...props }: props) {
	const [field, , meta] = useField(name)

	return (
		<Box
			{...props}
			onClick={() => meta.setValue(value)}
			borderWidth="2px"
			borderColor={field.value === value ? "brand.500" : "transparents"}
			shadow={field.value === value ? "lg" : ""}
			cursor="pointer"
		>
			{children}
		</Box>
	)
}
