import { InputProps } from "@chakra-ui/react"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"

interface props extends InputProps, FormikBase {
	name: string
	options: { label: string; value: any }[]
}

export default function FormikAutocompletedInput({ ...props }: props) {
	//https://github.com/koolamusic/chakra-ui-autocomplete
	return <FormikControl {...props}>{(field, helpers, meta) => <></>}</FormikControl>
}
