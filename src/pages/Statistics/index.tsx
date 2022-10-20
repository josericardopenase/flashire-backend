import { Heading } from "@chakra-ui/react"
import React from "react"
import { Outlet } from "react-router-dom"
import metrics from "@api/metrics"
import PageContainer from "@components/containers/PageContainer"
import CenterLoader from "@components/other/CenterLoader"

export default function Statistics() {
	const { status } = metrics.useDgtMetrics()

	if (status === "loading") return <CenterLoader />

	return (
		<PageContainer>
			<Heading mb="10">Métricas 📈 </Heading>
			{/* 
			<HorizontalNavigation
				tabs={[
					{
						title: "Resumen",
						href: "/metrics",
					},
					{
						title: "Tráfico",
						href: "/metrics/traffic",
					},
				]}
			></HorizontalNavigation>
			*/}
			<Outlet></Outlet>
		</PageContainer>
	)
}
