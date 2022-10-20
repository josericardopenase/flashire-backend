import OfficeService from "@api/offices"
import { Button, Heading, Icon, Stack } from "@chakra-ui/react"
import PageContainer from "@components/containers/PageContainer"
import { FormikInput } from "@components/forms"
import FormikStepperForm from "@components/forms/FormikStepperForm"
import FlatList from "@davinci/components/FlatList"
import React, { useState } from "react"
import { BiCamera, BiCog, BiSearch } from "react-icons/bi"
import OfficeCard from "./components/OfficeCard"
import * as Yup from "yup"
import "@utils/validators"
import { FormikImagePickerBox } from "@components/forms/FormikImagePicker"
import FormikGoogleMapsInput from "@components/forms/FormikGoogleMapsInput"

export default function index() {
	const [open, setOpen] = useState(false)
	const { mutateAsync } = OfficeService.useCreate()

	return (
		<PageContainer>
			<Heading mb="5">Oficinas</Heading>
			<FlatList
				cols={[1, 1, 1, 2, 3, 4]}
				my="5"
				apiService={OfficeService}
				filterForm={
					<Stack gap={4} direction="row">
						<FormikInput
							placeholder="Buscar oficina"
							leftIcon={<Icon color="gray.500" as={BiSearch}></Icon>}
							name="name__contains"
							variant="primary"
						></FormikInput>
						<Button colorScheme="brand" onClick={() => setOpen(true)}>
							Nueva oficina
						</Button>
						<FormikStepperForm
							initialValues={{ name: "", phone: "", thumbnail: "", email: "", ubication: "" }}
							onClose={() => setOpen(false)}
							isOpen={open}
							onSubmit={async (values: any) => await mutateAsync(values)}
							items={[
								{
									title: "Configuración",
									icon: <Icon fontSize="23px" as={BiCog}></Icon>,
									form: (
										<>
											<FormikInput name="name" placeholder="Nombre..." label="Nombre" variant="filled"></FormikInput>
											<FormikInput
												variant="filled"
												mt="4"
												name="phone"
												placeholder="Número de teléfono..."
												label="Número de teléfono"
											></FormikInput>
											<FormikInput variant="filled" mt="4" name="email" placeholder="Email..." label="Email"></FormikInput>
											<FormikGoogleMapsInput
												variant="filled"
												mt="4"
												name="ubication"
												placeholder="Ubicación..."
												label="Ubicación"
											></FormikGoogleMapsInput>
										</>
									),
									yup: {
										name: Yup.string().required(),
										email: Yup.string().required().email(),
										ubication: Yup.string().required(),
										phone: Yup.string().required().phone(),
									},
								},
								{
									title: "Configuración",
									icon: <Icon fontSize="23px" as={BiCamera}></Icon>,
									form: (
										<>
											<FormikImagePickerBox name="thumbnail"></FormikImagePickerBox>
										</>
									),
									yup: {},
								},
							]}
						></FormikStepperForm>
					</Stack>
				}
			>
				{(obj) => <OfficeCard key={obj.id} office={obj} />}
			</FlatList>
		</PageContainer>
	)
}
