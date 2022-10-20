import { Input, InputGroup, InputLeftAddon, InputLeftElement, InputProps, InputRightAddon, InputRightElement } from "@chakra-ui/react"
import React from "react"
import FormikControl, { FormikBase } from "./FormikControl"
import { usePlacesWidget } from "react-google-autocomplete"
import { useFormikContext } from "formik"

interface props extends InputProps, FormikBase {
	name: string
	leftIcon?: JSX.Element | string
	rightIcon?: JSX.Element | string
	addon?: boolean
}

export default function FormikGoogleMapsInput({ leftIcon, rightIcon, addon, ...props }: props) {
	const AddonLeft = !addon ? InputLeftElement : InputLeftAddon
	const AddonRight = !addon ? InputRightElement : InputRightAddon
	const formik = useFormikContext<any>()

	return (
		<FormikControl {...props}>
			{(field, meta, helpers) => {
				const { ref, autocompleteRef } = usePlacesWidget({
					apiKey: "AIzaSyBCKUs1-N9-_6PZ6MRsFXo73v7TMhn8zMs",
					onPlaceSelected: (place) => {
						helpers.setValue(place.formatted_address)
						console.log(place.address_components)
						place.address_components?.forEach((x) => {
							if (x.types.includes("postal_code")) {
								formik.setFieldValue("postal_code", x.long_name)
							}
							if (x.types.includes("locality")) {
								formik.setFieldValue("city", x.long_name)
							}
							if (x.types.includes("administrative_area_level_2")) {
								formik.setFieldValue("province", x.long_name)
							}
						})
					},
					options: {
						types: ["geocode"],
						componentRestrictions: { country: "es" },
					},
				})
				return (
					<InputGroup>
						{leftIcon && <AddonLeft pointerEvents="none">{leftIcon}</AddonLeft>}
						<Input {...field} ref={ref} />
						{rightIcon && <AddonRight pointerEvents="none">{rightIcon}</AddonRight>}
					</InputGroup>
				)
			}}
		</FormikControl>
	)
}
/*


*/
