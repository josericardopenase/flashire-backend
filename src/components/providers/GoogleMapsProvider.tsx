import CenterLoader from "@components/other/CenterLoader"
import { useJsApiLoader } from "@react-google-maps/api"
import React from "react"

const libraries: any = ["places"]

export default function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyBCKUs1-N9-_6PZ6MRsFXo73v7TMhn8zMs",
		libraries: libraries,
	})

	if (!isLoaded) return <CenterLoader></CenterLoader>

	return <>{children}</>
}
