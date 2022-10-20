import { Box, Button, Center, Heading, Icon, SimpleGrid, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react"
import EmployeeService from "@api/users/employees"
import { FieldArray, Formik } from "formik"
import { FormikButton } from "@components/forms"
import { BiPlus, BiStore, BiX } from "react-icons/bi"
import DeleteButton from "@components/buttons/DeleteButton"
import OfficeService from "@api/offices"
import OfficeGenericCard from "@konextcomponents/offices/OfficeGenericCard"
import NotAsigned from "@components/other/NotAsigned"

interface props {
	isOpen: any
	onClose: any
}

function VehiclePicker({ isOpen, onClose }: props) {
	const { id } = useParams()
	const employee = EmployeeService.useRetrieve(id)
	const { data } = OfficeService.useList()
	const { mutateAsync } = EmployeeService.useUpdate()

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="6xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Agregar centro de trabajo</ModalHeader>

				<ModalCloseButton />
				<Formik
					initialValues={{ offices: [] as number[] }}
					onSubmit={async (values, helpers) => {
						helpers.setSubmitting(true)
						await mutateAsync({ id: employee?.data?.id, offices: values.offices })
						helpers.setSubmitting(false)
						onClose()
					}}
				>
					{({ values }) => (
						<>
							<ModalBody>
								<SimpleGrid columns={3} gap={4}>
									<FieldArray
										name="offices"
										render={(arrayHelpers) => (
											<>
												{data?.results.map((x) => (
													<Box
														key={x.id}
														onClick={() =>
															values.offices.includes(x?.id)
																? arrayHelpers.remove(values.offices.findIndex((y) => y === x.id))
																: arrayHelpers.push(x.id)
														}
														borderRadius="25px"
														overflow="hidden"
														borderWidth="2px"
														borderColor={values.offices.includes(x?.id) ? "brand.500" : "transparent"}
													>
														<OfficeGenericCard secondary key={x.id} office={x} />
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

function OfficeCard({ x }: { x: number }) {
	const { id } = useParams()
	const employee = EmployeeService.useRetrieve(id)
	const { data, status } = OfficeService.useRetrieve(x)
	const { mutateAsync } = EmployeeService.useUpdate()

	if (status === "loading") return <></>
	if (status === "error" || !data) return <></>

	return (
		<Box position="relative" key={x}>
			<Box position="absolute" zIndex="100" m="2" top="0" right="0">
				<DeleteButton
					icon={BiX}
					aria-label="remove"
					deleteFunction={() => mutateAsync({ id: parseInt(id ?? "1"), offices: employee.data?.offices.filter((y) => y !== x) })}
				/>
			</Box>
			<OfficeGenericCard secondary office={data}></OfficeGenericCard>
		</Box>
	)
}

export default function index() {
	const { id } = useParams()
	const employee = EmployeeService.useRetrieve(id)
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<VehiclePicker isOpen={isOpen} onClose={onClose}></VehiclePicker>
			<Heading size="md" mt="8">
				Centros de trabajo
			</Heading>
			{employee.data?.offices.length === 0 ? (
				<NotAsigned onClick={() => onOpen()} label="No tiene centros de trabajos asignados." button="Asignar centro" icon={BiStore} />
			) : (
				<SimpleGrid columns={4} gap={4} mt="5">
					{employee?.data?.offices.map((x) => (
						<OfficeCard key={x} x={x}></OfficeCard>
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
							<Text mt="3">Añadir centro de trabajo</Text>
						</Center>
					</Center>
				</SimpleGrid>
			)}
		</>
	)
}
