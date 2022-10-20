import { InputProps, Textarea } from "@chakra-ui/react"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"

interface props extends InputProps, FormikBase {
	name: string
}

export default function FormikTextArea(props: props) {
	return <FormikControl {...props}>{(props) => <Textarea {...props} />}</FormikControl>
}
