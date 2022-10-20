import { HStack, InputProps, PinInput, PinInputField } from "@chakra-ui/react"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"

interface props extends InputProps, FormikBase {
	name: string
	leftIcon?: JSX.Element | string
	rightIcon?: JSX.Element | string
	addon?: boolean
	pins: (React.HTMLInputTypeAttribute | { type: React.HTMLInputTypeAttribute; pattern: string })[]
}

export default function FormikPinInput({ pins, ...props }: props) {
	return (
		<HStack {...props}>
			<FormikControl {...props}>
				{(field, helpers, meta) => (
					<HStack>
						<PinInput type="alphanumeric" {...field} onChange={(val) => meta.setValue(val)}>
							{pins.map((x, i) =>
								typeof x === "string" ? (
									<PinInputField type={x} key={i} />
								) : (
									<PinInputField type={x.type} pattern={x.pattern} key={i} />
								)
							)}
						</PinInput>
					</HStack>
				)}
			</FormikControl>
		</HStack>
	)
}
/*


*/
