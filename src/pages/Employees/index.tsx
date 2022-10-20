import { Box, Button, Center, Flex, Heading, Icon, SimpleGrid, Stack, Switch, Text } from "@chakra-ui/react"
import PageContainer from "@components/containers/PageContainer"
import { FormikInput } from "@components/forms"
import FormikStepperForm from "@components/forms/FormikStepperForm"
import FlatList from "@davinci/components/FlatList"
import React, { useState } from "react"
import { BiSearch, BiUserCircle, BiEnvelope, BiLock, BiWrench, BiCar, BiStoreAlt, BiBriefcase, BiMobile, BiMap } from "react-icons/bi"
import "@utils/validators"
import { FormikProfileImagePicker } from "@components/forms/FormikImagePicker"
import EmployeeService from "@api/users/employees"
import EmployeeCard from "./components/EmployeeCard"
import FormikSetValue from "@components/forms/FormikSetValue"
import FormikGoogleMapsInput from "@components/forms/FormikGoogleMapsInput"
import { makeid } from "@utils/helpers/strings"

export default function index() {
	const [open, setOpen] = useState(false)
	const { mutateAsync } = EmployeeService.useCreate()

	return (
		<PageContainer>
			<Heading mb="5">Empleados</Heading>
			<FlatList
				cols={1}
				my="5"
				apiService={EmployeeService}
				filterForm={
					<Stack gap={4} direction="row">
						<FormikInput
							placeholder="Buscar empleado"
							leftIcon={<Icon color="gray.500" as={BiSearch}></Icon>}
							name="name__contains"
							variant="primary"
						></FormikInput>
						<Button colorScheme="brand" onClick={() => setOpen(true)}>
							Nuevo usuario
						</Button>
						<FormikStepperForm
							initialValues={{ plate_number: "", vehicle_type: "", email: "", thumbnail: "", ubication: "", fuel_type: "GAS" }}
							onClose={() => setOpen(false)}
							isOpen={open}
							onSubmit={async (values: any) => await mutateAsync(values)}
							items={[
								{
									title: "Datos básicos",
									icon: <Icon fontSize="23px" as={BiUserCircle}></Icon>,
									form: (field) => (
										<>
											<Stack gap={3}>
												<Center w="100%">
													<FormikProfileImagePicker name="avatar" />
												</Center>
												<SimpleGrid gap={6} columns={2}>
													<FormikInput label="Nombre" variant="filled" name="first_name" />
													<FormikInput label="Apellidos" name="last_name" variant="filled" />
												</SimpleGrid>
												<FormikInput
													leftIcon={<Icon color="gray.500" as={BiEnvelope}></Icon>}
													name="email"
													label="Email"
													variant="filled"
												></FormikInput>
												<FormikInput
													leftIcon={<Icon color="gray.500" as={BiMobile}></Icon>}
													name="phone_number"
													label="Número de móvil"
													variant="filled"
												></FormikInput>
											</Stack>
										</>
									),
									yup: {},
								},
								{
									title: "Ubicación",
									icon: <Icon fontSize="23px" as={BiMap}></Icon>,
									form: (field) => (
										<>
											<SimpleGrid columns={1} alignItems="self-end" gap={4}>
												<FormikGoogleMapsInput name="address" label="Dirección" variant="filled"></FormikGoogleMapsInput>
												<SimpleGrid columns={3} gap={6}>
													<FormikInput name="city" label="Ciudad" variant="filled"></FormikInput>
													<FormikInput name="province" label="Provincia" variant="filled"></FormikInput>
													<FormikInput name="postal_code" label="Código postal" variant="filled"></FormikInput>
												</SimpleGrid>
											</SimpleGrid>

											<SimpleGrid gap={6} columns={2} mt="3"></SimpleGrid>
										</>
									),
									yup: {},
								},
								{
									title: "Seguridad",
									icon: <Icon fontSize="23px" as={BiLock}></Icon>,
									form: (field) => (
										<>
											<SimpleGrid columns={1} alignItems="self-end" gap={4}>
												<Flex alignItems="flex-end">
													<FormikInput mr="3" name="password" label="Crea una contraseña" variant="filled"></FormikInput>
													<Button onClick={() => field.setFieldValue("password", makeid(8))}>Generar</Button>
												</Flex>
												<Flex alignItems="center" mt="5">
													<Switch name="change_password" colorScheme="brand" />
													<Text ml="3" color="gray.500">
														Pedir al usuario cambiar la contraseña cuando inicie sesión
													</Text>
												</Flex>
												<Flex alignItems="center">
													<Switch name="send_email" colorScheme="brand" />
													<Text ml="3" color="gray.500">
														Enviar email con la contraseña al usuario
													</Text>
												</Flex>
											</SimpleGrid>

											<SimpleGrid gap={6} columns={2} mt="3"></SimpleGrid>
										</>
									),
									yup: {},
								},
								{
									title: "Tipo de usuario",
									icon: <Icon fontSize="23px" as={BiWrench}></Icon>,
									form: (field) => (
										<>
											<SimpleGrid columns={1} alignItems="self-end" gap={4}>
												<FormikSetValue name="role" value="TEACHER" borderRadius="20px">
													<Box p="5">
														<Flex alignItems="center">
															<Center height="60px" width="60px" borderRadius="lg" bgColor="brand.500">
																<Icon color="white" fontSize="24px" as={BiCar}></Icon>
															</Center>
															<Box ml="5">
																<Text fontWeight="semibold" fontSize="17px">
																	Profesor
																</Text>
																<Text color="gray.500">Crea un nuevo profesor para tu autoescuela</Text>
															</Box>
														</Flex>
													</Box>
												</FormikSetValue>
												<FormikSetValue name="role" value="SECRETARY" borderRadius="20px">
													<Box p="5">
														<Flex alignItems="center">
															<Center height="60px" width="60px" borderRadius="lg" bgColor="brand.500">
																<Icon color="white" fontSize="24px" as={BiStoreAlt}></Icon>
															</Center>
															<Box ml="5">
																<Text fontWeight="semibold" fontSize="17px">
																	Secretaria
																</Text>
																<Text color="gray.500">Crea una nueva secretaria para tu autoescuela</Text>
															</Box>
														</Flex>
													</Box>
												</FormikSetValue>
												<FormikSetValue name="role" value="MANAGER" borderRadius="20px">
													<Box p="5">
														<Flex alignItems="center">
															<Center height="60px" width="60px" borderRadius="lg" bgColor="brand.500">
																<Icon color="white" fontSize="24px" as={BiBriefcase}></Icon>
															</Center>
															<Box ml="5">
																<Text fontWeight="semibold" fontSize="17px">
																	Manager
																</Text>
																<Text color="gray.500">Crea una nuevo gestor de tu negocio</Text>
															</Box>
														</Flex>
													</Box>
												</FormikSetValue>
											</SimpleGrid>
										</>
									),
									yup: {},
								},
							]}
						></FormikStepperForm>
					</Stack>
				}
			>
				{(obj) => <EmployeeCard key={obj.id} employee={obj} />}
			</FlatList>
		</PageContainer>
	)
}
