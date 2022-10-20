import { Box, BoxProps, TextProps, Text, Wrap, InputProps } from "@chakra-ui/react"
import React, { useEffect } from "react"
import FormikControl, { FormikBase } from "./FormikControl"

interface Options {
	value: string | boolean | number
	label: string
}

interface props extends InputProps, FormikBase {
	options: Options[]
	name: string
	multiple?: boolean
	textProps?: TextProps
}

export default function FormikToggleList({ options, name, multiple, textProps, ...args }: props) {
	return (
		<FormikControl name={name} {...args}>
			{(field, helpers, meta) => {
				useEffect(() => {
					if (!field.value) meta.setValue([])
				}, [])

				function onClick(opt: string | boolean | number) {
					if (!multiple) meta.setValue(opt)
					else {
						if (isActive(opt)) meta.setValue(field.value.filter((x: any) => x != opt))
						else meta.setValue([...field.value, opt])
					}
				}

				function isActive(opt: string | boolean | number) {
					try {
						if (multiple) return field.value.includes(opt)
						else return field.value === opt
					} catch {
						return false
					}
				}
				return (
					<Wrap {...(args as BoxProps)}>
						{options.map((x, i) => (
							<Box
								onClick={() => onClick(x.value)}
								cursor="pointer"
								pl="4"
								pr="4"
								pb="2"
								pt="2"
								border="2px"
								borderColor={isActive(x.value) ? "brand.500" : "gray.100"}
								color={isActive(x.value) ? "brand.500" : "gray.400"}
								borderRadius="base"
								bgColor={isActive(x.value) ? "brandAlpha.300" : "gray.100"}
								key={i}
							>
								<Text {...textProps}>{x.label}</Text>
							</Box>
						))}
					</Wrap>
				)
			}}
		</FormikControl>
	)
}
