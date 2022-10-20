import { Switch, SwitchProps } from "@chakra-ui/react"
import { useField } from "formik"
import React from "react"

interface props extends SwitchProps {
	name: string
}

export default function FormikToggle(props: props) {
	const [field, , ,] = useField(props.name)

	return <Switch {...props} {...field} isChecked={field.value} />
}
