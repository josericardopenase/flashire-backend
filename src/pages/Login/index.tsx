import { Box, Heading, Icon, SimpleGrid, Stack, Text, Image, Center } from "@chakra-ui/react"
import { FormikButton, FormikInput } from "@components/forms"
import { Formik } from "formik"
import React from "react"
import { BiEnvelope, BiLock } from "react-icons/bi"
import dashboard from "@assets/Metrics2.png"
import LogoNegative from "@assets/LogoNegative"
import useAuth from "@api/auth/useAuth"
import { useDispatch } from "react-redux"
import { setToken } from "@storage/reducer/auth.reducer"
import queryClient from "@davinci/clients/queryClient"
import { useNavigate } from "react-router-dom"
import Square from "./components/Square"

export default function index() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { mutateAsync } = useAuth((data: any) => {
		{
			dispatch(setToken(data.token))
			queryClient.refetchQueries(["me"])
			navigate("/")
		}
	})

	return (
		<SimpleGrid columns={[1, 1, 1, 2, 2]} height="100vh">
			<Box p={["5", "8", "16", "16", "36"]} bgColor="white">
				<Box position="absolute" top="0" left="0" m="8">
					<LogoNegative width={150} />
				</Box>
				<Formik
					initialValues={{ username: "", password: "" }}
					onSubmit={async (value) => {
						console.log(value)
						await mutateAsync(value)
					}}
				>
					{(field) => (
						<Box mt="28">
							<Heading>Bienvenido de nuevo</Heading>
							<Text my="3" color="gray.500">
								Por favor, pon tus credenciales
							</Text>
							<Stack gap={5} mt="10">
								<FormikInput
									leftIcon={<Icon color="gray.500" as={BiEnvelope}></Icon>}
									variant="filled"
									placeholder="Pon tu email"
									name="username"
									label="Cuenta de email"
								></FormikInput>
								<FormikInput
									type="password"
									leftIcon={<Icon color="gray.500" as={BiLock}></Icon>}
									placeholder="Pon tu contraseña"
									variant="filled"
									name="password"
									label="Contraseña"
								></FormikInput>
								<SimpleGrid columns={1} gap={5}>
									<FormikButton colorScheme="brand" py="6">
										Iniciar sesión
									</FormikButton>
								</SimpleGrid>
							</Stack>
						</Box>
					)}
				</Formik>
			</Box>
			<Center bgColor="brand.500" position="relative" display={["none", "none", "none", "flex", "flex"]} overflow="hidden">
				<Box position="absolute" top="-10" left="-13">
					<Square size={1} side={20} color="brand.700"></Square>
				</Box>
				<Box position="absolute" bottom="-10" right="-13">
					<Square size={1} side={20} color="brand.700"></Square>
				</Box>
				<Image boxShadow="lg.soft" borderRadius="15px" right="-150px" border="3px solid white" position="absolute" src={dashboard}></Image>
			</Center>
		</SimpleGrid>
	)
}
