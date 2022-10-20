import EmployeeService from "@api/users/employees"
import { Box, Center, Flex, Heading, Icon, SimpleGrid, Stack } from "@chakra-ui/react"
import { FormikButton, FormikInput } from "@components/forms"
import FormikGoogleMapsInput from "@components/forms/FormikGoogleMapsInput"
import { FormikProfileImagePicker } from "@components/forms/FormikImagePicker"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import { Formik } from "formik"
import React from "react"
import { BiEnvelope, BiMobile } from "react-icons/bi"
import { useParams } from "react-router-dom"

export default function TeacherDetailedSchedule() {
	const { id } = useParams()
	const { data, status } = EmployeeService.useRetrieve(id)
	const { mutateAsync } = EmployeeService.useUpdate()

	return (
		<DavinciLoader status={status}>
			<Formik enableReinitialize={true} initialValues={{ ...data }} onSubmit={(values: any) => mutateAsync(values)}>
				{() => (
					<>
						<SimpleGrid columns={2} gap="3" mt="5">
							<Box p="5" borderRadius="xl" bgColor="gray.50">
								<Heading fontSize="md">Datos generales</Heading>
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
								</Stack>
							</Box>
							<Box p="5" borderRadius="xl" bgColor="gray.50">
								<Heading fontSize="md">Contacto</Heading>
								<SimpleGrid columns={1} alignItems="self-end" gap={4} mt="10">
									<FormikInput
										leftIcon={<Icon color="gray.500" as={BiMobile}></Icon>}
										name="phone_number"
										label="Número de móvil"
										variant="filled"
									></FormikInput>
									<FormikGoogleMapsInput name="address" label="Dirección" variant="filled"></FormikGoogleMapsInput>
									<SimpleGrid columns={3} gap={6}>
										<FormikInput name="city" label="Ciudad" variant="filled"></FormikInput>
										<FormikInput name="province" label="Provincia" variant="filled"></FormikInput>
										<FormikInput name="postal_code" label="Código postal" variant="filled"></FormikInput>
									</SimpleGrid>
								</SimpleGrid>
							</Box>
						</SimpleGrid>
						<Flex w="100%" justifyContent="flex-end">
							<FormikButton mt="4" colorScheme="brand">
								Guardar
							</FormikButton>
						</Flex>
					</>
				)}
			</Formik>
		</DavinciLoader>
	)
}
