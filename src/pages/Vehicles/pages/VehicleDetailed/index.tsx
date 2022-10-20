import VehicleService from "@api/vehicles"
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import ReturnButton from "@components/buttons/ReturnButton"
import PageContainer from "@components/containers/PageContainer"
import { FormikButton, FormikInput, FormikSelect } from "@components/forms"
import { FormikFilePickerBox } from "@components/forms/FormikFilePicker"
import ProfileUpdateAvatar from "@components/forms/ProfileUpdateAvatar"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import { VEHICLE_TYPE_CHOICES } from "@utils/constants/cars.constants"
import { Formik } from "formik"
import React from "react"
import { useParams } from "react-router-dom"

export default function VehicleDetailed() {
	const { id } = useParams()
	const { data, status } = VehicleService.useRetrieve(id)
	const { mutateAsync } = VehicleService.useUpdate()

	return (
		<DavinciLoader status={status}>
			<PageContainer detailed>
				<Flex alignItems="center" mb="5">
					<ReturnButton></ReturnButton>

					<ProfileUpdateAvatar
						onUpdate={async (avatar) => await mutateAsync({ id: data?.id, thumbnail: avatar })}
						mr="3"
						ml="3"
						src={data?.thumbnail ?? ""}
					/>
					<Heading>{data?.plate_number}</Heading>
				</Flex>

				<Formik
					initialValues={{ ...data }}
					onSubmit={async (values, helpers) => {
						if (!values.ficha_tecnica) delete values.ficha_tecnica
						if (!values.permiso_circulacion) delete values.permiso_circulacion
						if (!values.seguro) delete values.seguro
						delete values?.thumbnail
						await mutateAsync(values)
						helpers.setSubmitting(false)
					}}
				>
					{() => (
						<>
							<Heading mt="10" size="sm">
								Configuración básica
							</Heading>
							<FormikInput label="Mátricula" variant="filled" name="plate_number" mt="6" />
							<FormikInput label="Nombre" variant="filled" name="name" mt="6" />
							<SimpleGrid gap={6} columns={3} mt="6">
								<FormikInput label="Marca" variant="filled" name="brand" />
								<FormikInput label="Modelo" variant="filled" name="model" />
								<FormikSelect
									label="Tipo de vehiculo"
									variant="filled"
									name="vehicle_type"
									options={VEHICLE_TYPE_CHOICES.map((x) => ({ label: x[0], value: x[1] }))}
								/>
							</SimpleGrid>

							<Heading size="sm" mt="8" mb="8">
								Configuración avanzada
							</Heading>
							<FormikInput label="Número de bastidor" variant="filled" name="bastidor_Number" placeholder="Número de bastidor" />

							<SimpleGrid gap={6} columns={2} mt="3">
								<FormikInput type="date" label="Fecha de ITV" variant="filled" name="itv_date" />
								<FormikInput type="date" label="Fecha de Compra" variant="filled" name="purchase_date" />
							</SimpleGrid>

							<SimpleGrid gap={6} columns={2}>
								<FormikSelect
									options={[
										{ label: "Gasolina", value: "GAS" },
										{ label: "Diesel", value: "DIE" },
										{ label: "Diesel", value: "ELE" },
										{ label: "Híbrido", value: "HYB" },
									]}
									label="Tipo de combustible"
									variant="filled"
									name="fuel_type"
								/>
								<FormikInput type="number" label="Consumo por litro" variant="filled" name="consumption_per_litter" />
							</SimpleGrid>

							<Heading size="sm" mt="8" mb="8">
								Documentación
							</Heading>

							<SimpleGrid gap={6} columns={3} mt="3">
								<FormikFilePickerBox name="ficha_tecnica" label="Ficha técnica" />
								<FormikFilePickerBox name="permiso_circulacion" label="Permiso de circulación" />
								<FormikFilePickerBox name="seguro" label="Seguro" />
							</SimpleGrid>
							<Flex justifyContent="flex-end">
								<FormikButton colorScheme="brand" mt="5">
									Guardar
								</FormikButton>
							</Flex>
						</>
					)}
				</Formik>
			</PageContainer>
		</DavinciLoader>
	)
}
