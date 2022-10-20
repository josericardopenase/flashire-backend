import { Menu, MenuButton, Flex, Icon, Text, MenuItemOption, MenuList, MenuOptionGroup, As, Button, ButtonProps } from "@chakra-ui/react"
import { useField, useFormikContext } from "formik"
import React from "react"
import { FaQuestion } from "react-icons/fa"

interface options {
	label: string | React.ReactNode
	value?: any
	default?: boolean
	icon?: As<any>
}

interface props extends ButtonProps {
	name: string
	multiple?: boolean
	title?: string
	options: options[]
}

export default function FormikSelectCustom({ name, multiple, title, options, ...other }: props) {
	const [field, helpers, meta] = useField(name)
	const formik = useFormikContext()

	function remove() {
		const val: any = formik.values
		delete val[name]
		formik.setValues(val)
		formik.submitForm()
	}

	return (
		<Menu>
			<MenuButton>
				<Button {...other}>
					<Flex alignItems="center">
						<Icon color="gray.500" as={options.find((x) => x.value === field.value)?.icon ?? FaQuestion} mr="2"></Icon>
						<Text fontSize="sm">{options.find((x) => x.value === field.value)?.label ?? "No selected"}</Text>
					</Flex>
				</Button>
			</MenuButton>
			<MenuList px="0">
				<MenuOptionGroup
					onChange={(e) => (e === "default" ? remove() : meta.setValue(e))}
					title={title}
					type={multiple ? "checkbox" : "radio"}
					w="fit-content"
				>
					{options.map((x, i) => (
						<MenuItemOption key={i} value={x.value}>
							<Flex alignItems="center">
								<Icon color="gray.500" as={x.icon} mr="2"></Icon>
								<Text fontSize="sm">{x.label}</Text>
							</Flex>
						</MenuItemOption>
					))}
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	)
}
