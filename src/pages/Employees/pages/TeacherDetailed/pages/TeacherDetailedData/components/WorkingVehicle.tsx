import VehicleService from "@api/vehicles"
import { Box, Button, Center, Heading, Icon, SimpleGrid, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react"
import EmployeeService from "@api/users/employees"
import VehicleGenericCard from "@konextcomponents/vehicles/VehicleGenericCard"
import { FieldArray, Formik } from "formik"
import { FormikButton } from "@components/forms"
import { BiPlus, BiX } from "react-icons/bi"
import DeleteButton from "@components/buttons/DeleteButton"
import VehicleNotAsigned from "./VehicleNotAsigned"

interface props {
	isOpen: any
	onClose: any
}

function VehiclePicker({ isOpen, onClose }: props) {
	const { id } = useParams()
	const employee = EmployeeService.useRetrieve(id)
	const { data } = VehicleService.useList()
	const { mutateAsync } = VehicleService.useUpdate()

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="6xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Agregar vehiculos</ModalHeader>

				<ModalCloseButton />
				<Formik
					initialValues={{ cars_to_update: [] as number[] }}
					onSubmit={async (values, helpers) => {
						helpers.setSubmitting(true)
						values.cars_to_update.map(async (x) => await mutateAsync({ id: x, teacher: employee.data?.teacher_profile }))
						helpers.setSubmitting(false)
						onClose()
					}}
				>
					{({ values }) => (
						<>
							<ModalBody>
								<SimpleGrid columns={3} gap={4}>
									<FieldArray
										name="cars_to_update"
										render={(arrayHelpers) => (
											<>
												{data?.results.map((x) => (
													<Box
														key={x.id}
														onClick={() =>
															values.cars_to_update.includes(x?.id)
																? arrayHelpers.remove(values.cars_to_update.findIndex((y) => y === x.id))
																: arrayHelpers.push(x.id)
														}
														borderRadius="25px"
														overflow="hidden"
														borderWidth="2px"
														borderColor={values.cars_to_update.includes(x?.id) ? "brand.500" : "transparent"}
													>
														<VehicleGenericCard secondary key={x.id} vehicle={x} />
													</Box>
												))}
											</>
										)}
									/>
								</SimpleGrid>
							</ModalBody>
							<ModalFooter>
								<Button colorScheme="gray" mr={3} onClick={onClose}>
									Descartar
								</Button>
								<FormikButton colorScheme="brand">Guardar</FormikButton>
							</ModalFooter>
						</>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}

export default function index() {
	const { id } = useParams()
	const employee = EmployeeService.useRetrieve(id)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { data } = VehicleService.useList({ teacher: employee.data?.teacher_profile })
	const { mutateAsync } = VehicleService.useUpdate()

	return (
		<>
			<VehiclePicker isOpen={isOpen} onClose={onClose}></VehiclePicker>
			<Heading size="md" mt="8">
				Vehiculo de trabajo
			</Heading>
			{data?.results.length === 0 ? (
				<VehicleNotAsigned onClick={() => onOpen()}></VehicleNotAsigned>
			) : (
				<SimpleGrid columns={4} gap={4} mt="5">
					{data?.results.map((x) => (
						<Box position="relative" key={x.id}>
							<Box position="absolute" zIndex="100" m="2" top="0" right="0">
								<DeleteButton icon={BiX} aria-label="remove" deleteFunction={() => mutateAsync({ id: x.id, teacher: null })} />
							</Box>
							<VehicleGenericCard secondary vehicle={x}></VehicleGenericCard>
						</Box>
					))}
					<Center
						width="100%"
						borderRadius="25px"
						bgColor="gray.50"
						borderColor="gray.300"
						borderWidth="2px"
						cursor="pointer"
						p="5"
						color="gray.500"
						fontWeight="semibold"
						_hover={{ bgColor: "gray.100" }}
						onClick={onOpen}
					>
						<Center flexDirection="column">
							<Icon fontSize="50px" as={BiPlus}></Icon>
							<Text mt="3">Añadir vehiculo de trabajo</Text>
						</Center>
					</Center>
				</SimpleGrid>
			)}
		</>
	)
}
