import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Flex,
	Box,
} from "@chakra-ui/react";
import { Formik, FormikProps, FormikValues } from "formik";
import { IFormikForm } from "../forms/FormikForm";

interface props extends IFormikForm {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	children:
		| React.ReactNode
		| ((props: FormikProps<FormikValues>) => React.ReactNode);
	update?: boolean;
}

export default function ModalForm({
	isOpen,
	onClose,
	title = "Formulario",
	update,
	...props
}: props) {
	return (
		<Modal onClose={onClose} size={"2xl"} isOpen={isOpen}>
			<ModalOverlay backdropFilter="blur(5px) " />
			<ModalContent>
				<ModalHeader justifyContent="center">{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody p="5">
					<Formik
						{...props}
						onSubmit={async (values, helpers) => {
							helpers.setSubmitting(true);
							await props.onSubmit(values, helpers);
							helpers.setSubmitting(false);
							helpers.resetForm();
							onClose();
						}}
					>
						{(formik) => (
							<Box>
								{props.children instanceof Function
									? props.children(formik)
									: props.children}
								<Flex justifyContent="center" w="100%" mt="32">
									<Button
										onClick={onClose}
										variant="outline"
										mr="2"
									>
										Cancelar
									</Button>
									<Button
										isLoading={formik.isSubmitting}
										onClick={() => formik.handleSubmit()}
										colorScheme="brand"
									>
										{update ? "Guardar" : "Crear"}
									</Button>
								</Flex>
							</Box>
						)}
					</Formik>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
}
