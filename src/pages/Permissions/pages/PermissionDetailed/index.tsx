import { PermissionService } from "@api/permissions"
import { Box, Button, Flex, Heading, Icon, SimpleGrid, Stack } from "@chakra-ui/react"
import ReturnButton from "@components/buttons/ReturnButton"
import PageContainer from "@components/containers/PageContainer"
import { FormikButton, FormikInput, FormikSelect } from "@components/forms"
import FormikStepperForm from "@components/forms/FormikStepperForm"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import FlatList from "@davinci/components/FlatList"
import { CARNET_TYPES } from "@utils/constants/carnet.constants"
import { Formik } from "formik"
import React, { useState } from "react"
import { BiCog, BiSearch } from "react-icons/bi"
import { useParams } from "react-router-dom"

import * as Yup from "yup"
import PermissionClassCard from "./components/PermissionClassCard"

export default function VehicleDetailed() {
	const { id } = useParams()
	const { data, status } = PermissionService.useRetrieve(id)
	const { mutateAsync } = PermissionService.useUpdate()
	const [open, setOpen] = useState(false)
	const classes = PermissionService.classes(parseInt(id ?? "")).useCreate()

	return (
		<DavinciLoader status={status}>
			<PageContainer detailed>
				<Flex alignItems="center" mb="5">
					<ReturnButton></ReturnButton>
					<Heading>{data?.name}</Heading>
				</Flex>
				<Box>
					<Formik initialValues={{ ...data }} onSubmit={(values) => mutateAsync({ id: parseInt(id ?? "0"), ...values })}>
						{() => (
							<>
								<SimpleGrid columns={2} gap={6}>
									<FormikInput label="Nombre" variant="filled" name="name" />
									<FormikSelect
										label="Tipo de carnet"
										variant="filled"
										name="dgt_name"
										options={CARNET_TYPES.map((x) => ({ label: x, value: x }))}
									/>
								</SimpleGrid>
								<Flex justifyContent="flex-end" w="100%">
									<FormikButton mt="3" colorScheme="brand">
										Guardar
									</FormikButton>
								</Flex>
							</>
						)}
					</Formik>
				</Box>
				<Box bgColor="gray.100" borderRadius="20px" p="6" mt="6">
					<Flex justifyContent="space-between">
						<Heading fontSize="md" mb="5">
							Tipos de clases
						</Heading>
						<FormikStepperForm
							initialValues={{ permission: id }}
							onClose={() => setOpen(false)}
							isOpen={open}
							onSubmit={async (values: any) => await classes.mutateAsync(values)}
							items={[
								{
									title: "Datos básicos",
									icon: <Icon fontSize="23px" as={BiCog}></Icon>,
									form: () => (
										<>
											<FormikInput label="Nombre" variant="filled" name="name" />
											<SimpleGrid gap={6} columns={2} mt="6">
												<FormikInput label="Color" variant="filled" name="color" type="color" />
												<FormikInput label="Duración" variant="filled" name="duration" type="number" />
											</SimpleGrid>
										</>
									),
									yup: {
										name: Yup.string().required(),
									},
								},
							]}
						></FormikStepperForm>
					</Flex>
					<FlatList
						cols={[1]}
						my="5"
						apiService={PermissionService.classes(parseInt(id ?? ""))}
						filterForm={
							<Stack gap={4} direction="row">
								<FormikInput
									placeholder="Buscar permisos"
									leftIcon={<Icon color="gray.500" as={BiSearch}></Icon>}
									name="name__contains"
									variant="primary"
								></FormikInput>
								<Button colorScheme="brand" onClick={() => setOpen(true)}>
									Nueva clase
								</Button>
							</Stack>
						}
					>
						{(obj) => <PermissionClassCard key={obj.id} permission_class={obj}></PermissionClassCard>}
					</FlatList>
				</Box>
			</PageContainer>
		</DavinciLoader>
	)
}
