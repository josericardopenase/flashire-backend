import { extendTheme } from "@chakra-ui/react"
import foundations from "./foundations"

const direction = "ltr"

const config = {
	useSystemColorMode: false,
	initialColorMode: "light",
	cssVarPrefix: "socialwow",
}

export const theme = {
	styles: {
		global: (props: any) => ({
			body: {
				bg: "gray.100",
			},
		}),
	},

	direction,
	...foundations,
	config,
	components: {
		Input: {
			variants: {
				primary: {
					backgroundColor: "white",
					_hover: {
						backgroundColor: "gray.200 !important",
					},
					_active: { backgroundColor: "gray.300" },
					color: "gray.900",
				},
				brandAlpha: {
					backgroundColor: "whiteAlpha.300",

					_hover: {
						bg: "whiteAlpha.400",
					},
					_active: { bg: "whiteAlpha.400" },
					color: "whiteAlpha.900",
				},
			},
		},
		Button: {
			variants: {
				primary: {
					backgroundColor: "white",
					_hover: {
						bg: "gray.200",
					},
					_active: { bg: "gray.300" },
					color: "gray.900",
				},
			},
		},
	},
}

export default extendTheme(theme)
