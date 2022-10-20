import { InputProps, CheckboxGroup, Stack, Checkbox, CheckboxProps } from "@chakra-ui/react"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"

interface options {
	label: string
	value?: any
	default?: boolean
}

interface props extends InputProps, FormikBase {
	name: string
	options: options[]
	checkboxProps?: CheckboxProps
}

export default function FormikCheckboxGroup({ name, options, checkboxProps, ...args }: props) {
	//FIXME: no esta funcionando el radio group
	return (
		<FormikControl name={name} {...args}>
			{(field) => (
				<CheckboxGroup>
					<Stack>
						{options.map((x, i) => (
							<Checkbox key={i} value={x.value} {...checkboxProps}>
								{x.label}
							</Checkbox>
						))}
					</Stack>
				</CheckboxGroup>
			)}
		</FormikControl>
	)
}
