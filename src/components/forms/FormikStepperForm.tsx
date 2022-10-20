import {
	Box,
	Button,
	Flex,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { IFormikForm } from "./FormikForm"
import * as Yup from "yup"
import FormikButton from "./FormikButton"
import { ObjectShape } from "yup/lib/object"
import { Formik, FormikProps } from "formik"

interface props extends Partial<IFormikForm> {
	isOpen: boolean
	onClose: () => void
	items: Step[]
	noForm?: boolean
}

export interface Step {
	icon: React.ReactNode
	title: string
	form: React.ReactNode | ((field: FormikProps<any>) => React.ReactNode)
	yup: ObjectShape
}

export default function FormikStepperForm({ isOpen, onClose, items, noForm, ...args }: props) {
	const [index, setIndex] = useState(0)

	const Form = Formik
	const decreaseIndex = () => (index > 0 ? setIndex((e) => e - 1) : null)

	useEffect(() => {
		return () => {
			setIndex(0)
		}
	}, [])

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose()
				setIndex(0)
			}}
			size="4xl"
			isCentered
			scrollBehavior="inside"
		>
			<ModalOverlay backdropFilter="blur(5px) " />
			<ModalContent>
				<Form
					validationSchema={Yup.object().shape(items[index].yup)}
					initialValues={{}}
					{...args}
					onSubmit={async (values, helpers) => {
						if (index < items.length - 1) {
							setIndex((e) => e + 1)
							helpers.setSubmitting(false)
						} else {
							if (args.onSubmit) await args.onSubmit(values, helpers)
							setIndex(0)
							onClose()
						}
					}}
				>
					{(formData) => (
						<>
							<ModalHeader></ModalHeader>
							<ModalCloseButton />
							<Flex justifyContent="center">
								<Flex alignItems="center">
									{items.map((x, i) => (
										<React.Fragment key={i}>
											<Flex
												justifyContent="center"
												alignItems="center"
												height="60px"
												width="60px"
												key={i}
												borderRadius="50%"
												bgColor={i > index ? "gray.100" : "brand.500"}
												color={i > index ? "gray.700" : "white"}
											>
												{x.icon}
											</Flex>
											{i !== items.length - 1 &&
												[1, 2, 3, 4].map((x) => (
													<Box
														key={x}
														width="5px"
														height="5px"
														bgColor={i > index - 1 ? "gray.100" : "brand.500"}
														borderRadius="50%"
														ml="1"
														mr="1"
													></Box>
												))}
										</React.Fragment>
									))}
								</Flex>
							</Flex>

							<Heading fontSize="24px" textAlign="center" mb={10} mt={10} fontWeight="semibold">
								{items[index].title}
							</Heading>
							<ModalBody maxH="500px">
								{/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
								{/* @ts-ignore */}
								{React.isValidElement(items[index].form) ? items[index].form : items[index]?.form(formData)}
							</ModalBody>

							<ModalFooter display="flex" justifyContent="center" mt={10} mb={5}>
								{index > 0 && (
									<Button variant="outline" mr={3} px="6" py="5" onClick={decreaseIndex}>
										Anterior
									</Button>
								)}
								<FormikButton colorScheme="brand" mr={3} px="6" py="5">
									{index === items.length - 1 ? "Terminar" : "Siguiente"}
								</FormikButton>
							</ModalFooter>
						</>
					)}
				</Form>
			</ModalContent>
		</Modal>
	)
}
