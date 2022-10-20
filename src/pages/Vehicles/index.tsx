import { Box, Button, Center, Flex, Heading, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import PageContainer from "@components/containers/PageContainer"
import { FormikInput, FormikSelect } from "@components/forms"
import FormikStepperForm from "@components/forms/FormikStepperForm"
import FlatList from "@davinci/components/FlatList"
import React, { useState } from "react"
import { BiCamera, BiCar, BiCog, BiFile, BiSearch } from "react-icons/bi"
import * as Yup from "yup"
import "@utils/validators"
import VehicleCard from "./components/VehicleCard"
import VehicleService from "@api/vehicles"
import { VEHICLE_TYPE_CHOICES } from "@utils/constants/cars.constants"
import { FormikFilePickerBox } from "@components/forms/FormikFilePicker"
import FormikPinInput from "@components/forms/FormikPinInput"
import { FormikImagePickerBox } from "@components/forms/FormikImagePicker"
import { GiEuropeanFlag } from "react-icons/gi"

export default function index() {
	const [open, setOpen] = useState(false)
	const { mutateAsync } = VehicleService.useCreate()

	return (
		<PageContainer>
			<Heading mb="5">Vehiculos</Heading>
			<FlatList
				cols={[1, 1, 1, 2, 3, 4]}
				my="5"
				apiService={VehicleService}
				filterForm={
					<Stack gap={4} direction="row">
						<FormikInput
							placeholder="Buscar vehiculo"
							leftIcon={<Icon color="gray.500" as={BiSearch}></Icon>}
							name="name__contains"
							variant="primary"
						></FormikInput>
						<Button colorScheme="brand" onClick={() => setOpen(true)}>
							Nuevo vehículo
						</Button>
						<FormikStepperForm
							initialValues={{ plate_number: "", vehicle_type: "", email: "", thumbnail: "", ubication: "", fuel_type: "GAS" }}
							onClose={() => setOpen(false)}
							isOpen={open}
							onSubmit={async (values: any) => await mutateAsync(values)}
							items={[
								{
									title: "Datos básicos",
									icon: <Icon fontSize="23px" as={BiCar}></Icon>,
									form: (field) => (
										<>
											<Center w="100%" p="5">
												<Box
													overflow="hidden"
													maxW="500px"
													w="100%"
													height="120px"
													borderWidth="2px"
													borderColor="gray.300"
													borderRadius="lg"
													display="flex"
												>
													<Center minW="80px" w="80px" bgColor="#033EA2" h="100%">
														<Stack textAlign="center">
															<Icon fontSize="40px" color="yellow.500" as={GiEuropeanFlag}></Icon>
															<Text fontSize="lg" color="white" fontWeight="bold">
																E
															</Text>
														</Stack>
													</Center>
													<Flex
														w="100%"
														fontSize="50px"
														fontWeight="bold"
														justifyContent="center"
														alignItems="center"
														px="10"
														textAlign="center"
														letterSpacing="10px"
													>
														<Text>{field.values["plate_number"] ? field.values["plate_number"].toUpperCase() : ""}</Text>
													</Flex>
												</Box>
											</Center>
											<Flex mt="5" w="100%" justifyContent="center">
												<FormikPinInput
													size="lg"
													w="fit-content"
													pins={["number", "number", "number", "number", "text", "text", "text"]}
													name="plate_number"
													label="Mátricula"
													variant="filled"
												/>
											</Flex>
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
										</>
									),
									yup: {
										brand: Yup.string().required(),
									},
								},
								{
									title: "Configuración avanzada",
									icon: <Icon fontSize="23px" as={BiCog}></Icon>,
									form: (
										<>
											<FormikInput
												label="Número de bastidor"
												variant="filled"
												name="bastidor_Number"
												placeholder="Número de bastidor"
											/>

											<SimpleGrid gap={6} columns={2} mt="3">
												<FormikInput type="date" label="Fecha de ITV" variant="filled" name="itv_date" />
												<FormikInput type="date" label="Fecha de Compra" variant="filled" name="purchase_date" />
											</SimpleGrid>

											<SimpleGrid gap={6} columns={2} mt="3">
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
										</>
									),
									yup: {},
								},
								{
									title: "Documentación",
									icon: <Icon fontSize="23px" as={BiFile}></Icon>,
									form: (
										<>
											<SimpleGrid gap={6} columns={3} mt="3">
												<FormikFilePickerBox name="ficha_tecnica" label="Ficha técnica" />
												<FormikFilePickerBox name="permiso_circulacion" label="Permiso de circulación" />
												<FormikFilePickerBox name="seguro" label="Seguro" />
											</SimpleGrid>
										</>
									),
									yup: {},
								},
								{
									title: "Imagen del coche",
									icon: <Icon fontSize="23px" as={BiCamera}></Icon>,
									form: (
										<>
											<FormikImagePickerBox name="thumbnail" />
										</>
									),
									yup: {},
								},
							]}
						></FormikStepperForm>
					</Stack>
				}
			>
				{(obj) => <VehicleCard key={obj.id} vehicle={obj} />}
			</FlatList>
		</PageContainer>
	)
}
