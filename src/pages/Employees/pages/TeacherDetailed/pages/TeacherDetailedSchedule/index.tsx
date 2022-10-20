import EmployeeService from "@api/users/employees"
import TeacherProfileService from "@api/users/teacherProfile"
import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { FormikButton, FormikSelect } from "@components/forms"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import { dayNames } from "@utils/constants/dates.constants"
import { Formik } from "formik"
import React from "react"
import { useParams } from "react-router-dom"
import Day from "./components/Day"

export default function TeacherDetailedSchedule() {
	const { id } = useParams()
	const { data, status } = EmployeeService.useRetrieve(id)
	const { mutateAsync } = TeacherProfileService.useUpdate()
	const teacher = TeacherProfileService.useRetrieve(data?.teacher_profile)

	return (
		<DavinciLoader status={status}>
			<DavinciLoader status={teacher.status}>
				<Formik enableReinitialize={true} initialValues={{ ...teacher.data }} onSubmit={(values: any) => mutateAsync(values)}>
					{() => (
						<>
							<Flex mt="3" alignItems="center" justifyContent="space-between">
								<Heading fontSize="lg">Horario de trabajo</Heading>
								<Flex alignItems="center" color="gray.500">
									<Text mr="3">Duración por clase</Text>
									<FormikSelect
										width="fit-content"
										variant="filled"
										name="calendar_frame"
										options={[
											{ label: "45m", value: 45 },
											{ label: "30m", value: 30 },
											{ label: "1h", value: 60 },
										]}
									></FormikSelect>
								</Flex>
							</Flex>
							<SimpleGrid columns={1} gap="3" mt="5">
								{dayNames.map((x, i) => (
									<Day key={x} name={x}></Day>
								))}
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
		</DavinciLoader>
	)
}
