import { Button, Heading, Icon, SimpleGrid, Stack } from "@chakra-ui/react"
import PageContainer from "@components/containers/PageContainer"
import { FormikInput, FormikSelect } from "@components/forms"
import FormikStepperForm from "@components/forms/FormikStepperForm"
import FlatList from "@davinci/components/FlatList"
import React, { useState } from "react"
import { BiCog, BiSearch } from "react-icons/bi"
import * as Yup from "yup"
import "@utils/validators"
import { PermissionService } from "@api/permissions"
import PermissionCard from "./components/PermissionCard"
import { CARNET_TYPES } from "@utils/constants/carnet.constants"

export default function index() {
	const [open, setOpen] = useState(false)
	const { mutateAsync } = PermissionService.useCreate()

	return (
		<PageContainer>
			<Heading mb="5">Permisos</Heading>
			<FlatList
				cols={[1]}
				my="5"
				apiService={PermissionService}
				filterForm={
					<Stack gap={4} direction="row">
						<FormikInput
							placeholder="Buscar permisos"
							leftIcon={<Icon color="gray.500" as={BiSearch}></Icon>}
							name="name__contains"
							variant="primary"
						></FormikInput>
						<Button colorScheme="brand" onClick={() => setOpen(true)}>
							Nuevo permisos
						</Button>
						<FormikStepperForm
							initialValues={{ name: "", dgt_name: "A1" }}
							onClose={() => setOpen(false)}
							isOpen={open}
							onSubmit={async (values: any) => await mutateAsync(values)}
							items={[
								{
									title: "Datos básicos",
									icon: <Icon fontSize="23px" as={BiCog}></Icon>,
									form: () => (
										<>
											<SimpleGrid gap={6} columns={1}>
												<FormikInput label="Nombre" variant="filled" name="name" />
												<FormikSelect
													label="Tipo de carnet"
													variant="filled"
													name="dgt_name"
													options={CARNET_TYPES.map((x) => ({ label: x, value: x }))}
												/>
											</SimpleGrid>
										</>
									),
									yup: {
										name: Yup.string().required(),
									},
								},
							]}
						></FormikStepperForm>
					</Stack>
				}
			>
				{(obj) => <PermissionCard key={obj.id} permission={obj} />}
			</FlatList>
		</PageContainer>
	)
}
