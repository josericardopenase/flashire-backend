import { Input, InputGroup, InputLeftAddon, InputLeftElement, InputProps, InputRightAddon, InputRightElement } from "@chakra-ui/react"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"

interface props extends InputProps, FormikBase {
	name: string
	leftIcon?: JSX.Element | string
	rightIcon?: JSX.Element | string
	addon?: boolean
}

export default function FormikInput({ leftIcon, rightIcon, addon, ...props }: props) {
	const AddonLeft = !addon ? InputLeftElement : InputLeftAddon
	const AddonRight = !addon ? InputRightElement : InputRightAddon

	return (
		<FormikControl {...props}>
			{(field) => (
				<InputGroup>
					{leftIcon && <AddonLeft pointerEvents="none">{leftIcon}</AddonLeft>}
					<Input {...field} />
					{rightIcon && <AddonRight pointerEvents="none">{rightIcon}</AddonRight>}
				</InputGroup>
			)}
		</FormikControl>
	)
}
/*


*/
