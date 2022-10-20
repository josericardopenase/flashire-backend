import { InputProps, Select } from "@chakra-ui/react"
import { useField } from "formik"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"

export interface SelectValue {
	label?: string
	value?: any
	selected?: boolean
}

interface props extends InputProps, FormikBase {
	name: string
	options: SelectValue[]
}

export default function FormikSelect({ options, ...props }: props) {
	const [field, , ,] = useField(props.name)

	return (
		<FormikControl {...props}>
			{(props) => (
				<Select {...props} {...field}>
					{options.map((option, i: number) =>
						option.selected ? (
							<option selected value={option.value}>
								{option.label}
							</option>
						) : (
							<option value={option.value} key={i}>
								{option.label}
							</option>
						)
					)}
					/
				</Select>
			)}
		</FormikControl>
	)
}
