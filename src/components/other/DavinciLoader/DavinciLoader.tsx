import { Box } from "@chakra-ui/react"
import React from "react"
import CenterLoader from "../CenterLoader"

interface props {
	children: React.ReactNode
	status?: "error" | "idle" | "loading" | "success"
}

export default function DavinciLoader(props: props) {
	if (props.status === "loading") return <CenterLoader></CenterLoader>
	if (props.status === "error") return <Box>Hay un error</Box>

	return <>{props.children}</>
}
