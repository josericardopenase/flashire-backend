import {
	Box,
	Button,
	HStack,
	Menu,
	MenuButton,
	MenuList,
	SimpleGrid,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { GridContainer } from "../../../../components/containers"
import { months } from "../../../../utils/constants/dates.constants"
import ReactECharts from "echarts-for-react"
import FormikFilters from "../../../../components/forms/FormikFilters"
import FormikOptionGroup from "../../../../components/forms/FormikOptionGroup"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { FormikSelect } from "@components/forms"
import metrics from "@api/metrics"

function Stats({ label, number, increase, isPositive }: { label: string; number: string; increase: string; isPositive: boolean }) {
	return (
		<Box bgColor="white" px="10" py="4" borderRadius="20px">
			<Stat>
				<StatLabel color="gray.500">{label}</StatLabel>
				<StatNumber fontSize="3xl">{number}</StatNumber>
				<StatHelpText>
					<StatArrow type={isPositive ? "increase" : "decrease"} />
					{increase} % anterior mes
				</StatHelpText>
			</Stat>
		</Box>
	)
}

function StatGeneral({ label, backend_id }: { label: string; backend_id: string }) {
	const { data } = metrics.useDgtMetrics()

	return (
		<Stats
			label={label}
			number={data["AUTOESCUELA ECO"][backend_id][data["AUTOESCUELA ECO"][backend_id].length - 1].toFixed(2)}
			increase={(
				Math.abs(
					1 -
						data["AUTOESCUELA ECO"][backend_id][data["AUTOESCUELA ECO"][backend_id].length - 1] /
							data["AUTOESCUELA ECO"][backend_id][data["AUTOESCUELA ECO"][backend_id].length - 2]
				) * 100
			).toFixed(2)}
			isPositive={
				data["AUTOESCUELA ECO"][backend_id][data["AUTOESCUELA ECO"][backend_id].length - 1] -
					data["AUTOESCUELA ECO"][backend_id][data["AUTOESCUELA ECO"][backend_id].length - 2] >
				0
			}
		></Stats>
	)
}

export default function StatisticsGeneral() {
	const { data } = metrics.useDgtMetrics()
	const [filters, setFilters] = useState({
		autoescuelas: [],
		tipo_practico: "practico",
		tipo_teorico: "teorico",
	})

	const option2 = {
		xAxis: {
			type: "category",
			data: data["AUTOESCUELA ECO"][`presentados_${filters["tipo_practico"]}_por_mes`].map((x: any, i: number) => months[i].label),
		},
		tooltip: {
			trigger: "axis",
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "AUTOESCUELA ECO",
				data: data["AUTOESCUELA ECO"][`presentados_${filters["tipo_practico"]}_por_mes`],
				type: "line",
				smooth: true,
				color: "green",
			},
			...filters["autoescuelas"].map((x) => ({
				name: x,
				data: data[x][`presentados_${filters["tipo_practico"]}_por_mes`],
				type: "line",
				smooth: true,
			})),
		],
	}

	const option = {
		xAxis: {
			type: "category",
			data: data["AUTOESCUELA ECO"]["presentados_practico_por_mes"].map((x: any, i: number) => months[i].label),
		},
		tooltip: {
			trigger: "axis",
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "AUTOESCUELA ECO",
				data: data["AUTOESCUELA ECO"][`presentados_${filters["tipo_teorico"]}_por_mes`],
				type: "line",
				smooth: true,
				color: "green",
			},
			...filters["autoescuelas"].map((x) => ({
				name: x,
				data: data[x][`presentados_${filters["tipo_teorico"]}_por_mes`],
				type: "line",
				smooth: true,
			})),
		],
	}

	const option3 = {
		xAxis: {
			type: "category",
			data: data["AUTOESCUELA ECO"]["presentados_practico_por_mes"].map((x: any, i: number) => months[i].label),
		},
		tooltip: {
			trigger: "axis",
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "AUTOESCUELA ECO",
				data: data["AUTOESCUELA ECO"][`porcentaje_aprobados_${filters["tipo_teorico"]}_por_mes`],
				type: "line",
				smooth: true,
				color: "green",
			},
			...filters["autoescuelas"].map((x) => ({
				name: x,
				data: data[x][`porcentaje_aprobados_${filters["tipo_teorico"]}_por_mes`],
				type: "line",
				smooth: true,
			})),
		],
	}

	const option4 = {
		xAxis: {
			type: "category",
			data: data["AUTOESCUELA ECO"]["presentados_practico_por_mes"].map((x: any, i: number) => months[i].label),
		},
		tooltip: {
			trigger: "axis",
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "AUTOESCUELA ECO",
				data: data["AUTOESCUELA ECO"][`porcentaje_aprobados_${filters["tipo_practico"]}_por_mes`],
				type: "line",
				smooth: true,
				color: "green",
			},
			...filters["autoescuelas"].map((x) => ({
				name: x,
				data: data[x][`porcentaje_aprobados_${filters["tipo_practico"]}_por_mes`],
				type: "line",
				smooth: true,
			})),
		],
	}

	return (
		<>
			<FormikFilters
				initialValues={{ ...filters }}
				setFilters={setFilters}
				setLoading={() => {
					console.log("loading")
				}}
			>
				<SimpleGrid columns={1} spacing="5">
					<Text fontSize="xl" fontWeight="semibold">
						Resumen del mes de {months[data["AUTOESCUELA ECO"]["presentados_practico_por_mes"].length - 1].label}
					</Text>
					<SimpleGrid columns={3} w="100%" spacing="5">
						<StatGeneral label="presentados teórico" backend_id="presentados_teorico_por_mes"></StatGeneral>
						<StatGeneral label="aprobados teórico" backend_id="aprobados_teorico_por_mes"></StatGeneral>
						<StatGeneral label="porcentaje de aprobado teórico" backend_id="porcentaje_aprobados_teorico_por_mes"></StatGeneral>

						<StatGeneral label="presentados práctico" backend_id="presentados_practico_por_mes"></StatGeneral>
						<StatGeneral label="aprobados práctico" backend_id="aprobados_practico_por_mes"></StatGeneral>
						<StatGeneral label="porcentaje de aprobado práctico" backend_id="porcentaje_aprobados_practico_por_mes"></StatGeneral>
					</SimpleGrid>
					<Menu closeOnSelect={false}>
						<HStack alignItems="center">
							<Text>comparar con</Text>
							<MenuButton variant="primary" as={Button} rightIcon={<ChevronDownIcon />}>
								Otras autoescuelas
							</MenuButton>
						</HStack>
						<MenuList>
							<FormikOptionGroup
								multiple={true}
								name="autoescuelas"
								options={Object.keys(data).map((x: string) => ({
									label: x,
									value: x,
								}))}
							/>
						</MenuList>
					</Menu>

					<GridContainer
						title="Teórico"
						right={
							<FormikSelect
								variant="filled"
								size="sm"
								name="tipo_teorico"
								options={[
									{
										label: "Común",
										value: "teorico",
									},
									{
										label: "Específico",
										value: "teorico_especifico",
									},
								]}
							></FormikSelect>
						}
					>
						<SimpleGrid columns={2} pt="5">
							<Box>
								<Text px="10" fontWeight="semibold">
									Presentados
								</Text>
								<ReactECharts style={{ padding: 0, margin: 0 }} option={option}></ReactECharts>
							</Box>

							<Box>
								<Text px="10" fontWeight="semibold">
									Porcentaje de aprobados
								</Text>
								<ReactECharts style={{ padding: 0, margin: 0 }} option={option3}></ReactECharts>
							</Box>
						</SimpleGrid>
					</GridContainer>

					<GridContainer
						title="Práctico"
						right={
							<FormikSelect
								variant="filled"
								size="sm"
								name="tipo_practico"
								options={[
									{
										label: "Circuito abierto",
										value: "practico",
									},
									{
										label: "Circuito cerrado",
										value: "practico_circuito_cerrado",
									},
								]}
							></FormikSelect>
						}
					>
						<SimpleGrid columns={2} pt="5">
							<Box>
								<Text px="10" pt="5" fontWeight="semibold">
									Presentados
								</Text>
								<ReactECharts style={{ padding: 0, margin: 0 }} option={option2}></ReactECharts>
							</Box>
							<Box>
								<Text px="10" fontWeight="semibold">
									Porcentaje de aprobados
								</Text>
								<ReactECharts style={{ padding: 0, margin: 0 }} option={option4}></ReactECharts>
							</Box>
						</SimpleGrid>
					</GridContainer>
				</SimpleGrid>
			</FormikFilters>
		</>
	)
}
