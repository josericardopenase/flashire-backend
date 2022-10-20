import { FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react"
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from "formik"
import React from "react"

export interface FormikBase {
	label?: string
	helperText?: string
	showError?: boolean
	name: string
}

interface props extends FormikBase, Omit<FormControlProps, "children"> {
	children: (field: FieldInputProps<any> & any, meta: FieldMetaProps<any>, helpers: FieldHelperProps<any>) => React.ReactNode
}

export default function FormikControl({ name, children, label, showError, helperText, ...props }: props) {
	const [field, meta, helpers] = useField(name)

	return (
		<FormControl isInvalid={meta.error ? true : false} {...props}>
			{label && (
				<FormLabel color="gray.500" htmlFor={name}>
					{label}
				</FormLabel>
			)}
			{children({ ...props, ...field, m: 0 }, meta, helpers)}
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
			{showError && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
		</FormControl>
	)
}
