import { InputProps, RadioGroup, RadioProps, Stack, Radio } from "@chakra-ui/react"
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
	radioProps: RadioProps
}

export default function FormikFilterMenu({ name, options, ...args }: props) {
	//FIXME: no esta funcionando el radio group
	return (
		<FormikControl name={name} {...args}>
			{(field) => (
				<RadioGroup {...args} {...field}>
					<Stack>
						{options.map((x, i) => (
							<Radio key={i} value={x.value}>
								{x.label}
							</Radio>
						))}
					</Stack>
				</RadioGroup>
			)}
		</FormikControl>
	)
}
