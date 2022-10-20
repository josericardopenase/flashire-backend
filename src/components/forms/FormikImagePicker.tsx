import { useFormikContext } from "formik"
import React, { useRef } from "react"
import { Image, Box, Text, Center, Icon } from "@chakra-ui/react"
import { FaCamera, FaVideo } from "react-icons/fa"

interface props {
	name: string
	children?: React.ReactNode
}

export function FormikGeneralImagePicker({ name, children }: props) {
	const formik = useFormikContext<any>()
	const imageRef = useRef<any>(null)

	const onChange = (e: any) => {
		const file = imageRef?.current?.files[0]

		if (file) {
			const fileReader: FileReader = new FileReader()

			fileReader.onload = (event: any) => {
				formik.setFieldValue(name, event.target.result)
			}

			formik.setFieldValue("_imageInfo", imageRef.current.files[0])
		}
	}

	return (
		<div>
			<>
				<label className="text-center" htmlFor={name}>
					{children}
				</label>
				<input
					ref={imageRef}
					type="file"
					id={name}
					onChange={(e: any) => onChange(e)}
					onBlur={() => formik.setFieldTouched(name)}
					name={name}
					style={{ display: "None" }}
				></input>
			</>
		</div>
	)
}

export function FormikProfileImagePicker({ name, children }: props) {
	const formik = useFormikContext<any>()
	const imageRef = useRef<any>(null)

	const onChange = (e: any) => {
		const file = imageRef?.current?.files[0]

		if (file) {
			formik.setFieldValue("_imageInfo", imageRef.current.files[0])

			const fileReader: FileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = (event: any) => {
				formik.setFieldValue(name, event.target.result)
			}
		}
	}

	return (
		<div>
			<>
				<label className="text-center" htmlFor={name}>
					<Box
						role="group"
						position="relative"
						display="flex"
						justifyContent="center"
						alignItems="center"
						cursor="pointer"
						backgroundColor="gray.100"
						borderWidth="2px"
						borderColor="gray.300"
						borderStyle="dashed"
						height="160px"
						width="160px"
						borderRadius="50%"
					>
						{formik.values[name] ? (
							<Center position="relative">
								<Image
									_groupHover={{ filter: "brightness(0.5)" }}
									src={formik.values[name]}
									height="160px"
									width="160px"
									objectFit="cover"
									borderRadius="50%"
								/>
								<Icon _groupHover={{ opacity: 1 }} opacity="0" position="absolute" color="white" as={FaCamera} fontSize="40px"></Icon>
							</Center>
						) : (
							<Box
								opacity={1}
								position="absolute"
								textAlign="center"
								display="flex"
								flexDir="column"
								alignItems="center"
								color="gray.500"
							>
								<FaCamera size="40px"></FaCamera>
								<Text mt={4} fontSize="sm" m="3">
									Imagen de pérfil
								</Text>
							</Box>
						)}
					</Box>
				</label>
				<input
					ref={imageRef}
					type="file"
					id={name}
					onChange={(e: any) => onChange(e)}
					onBlur={() => formik.setFieldTouched(name)}
					name={name}
					style={{ display: "None" }}
				></input>
			</>
		</div>
	)
}

export function FormikImagePickerBox({ name, children }: props) {
	const formik = useFormikContext<any>()
	const imageRef = useRef<any>(null)

	const onChange = (e: any) => {
		const file = imageRef?.current?.files[0]

		if (file) {
			formik.setFieldValue("_imageInfo", imageRef.current.files[0])

			const fileReader: FileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = (event: any) => {
				formik.setFieldValue(name, event.target.result)
			}
		}
	}

	return (
		<div>
			<>
				<label className="text-center" htmlFor={name}>
					<Box
						role="group"
						position="relative"
						display="flex"
						justifyContent="center"
						alignItems="center"
						cursor="pointer"
						height="200px"
						backgroundColor="gray.100"
						borderRadius="lg"
						borderWidth="2px"
						borderColor="gray.300"
						borderStyle="dashed"
					>
						{formik.values[name] ? (
							<Image
								_groupHover={{ filter: "brightness(0.5)" }}
								src={formik.values[name]}
								height="160px"
								width="160px"
								objectFit="cover"
								borderRadius="lg"
							/>
						) : (
							<Box
								opacity={1}
								position="absolute"
								textAlign="center"
								display="flex"
								flexDir="column"
								alignItems="center"
								color="gray.500"
							>
								<FaCamera size="60px"></FaCamera>
								<Text mt={4}>Subir imagen</Text>
							</Box>
						)}
					</Box>
				</label>
				<input
					ref={imageRef}
					type="file"
					id={name}
					onChange={(e: any) => onChange(e)}
					onBlur={() => formik.setFieldTouched(name)}
					name={name}
					style={{ display: "None" }}
				></input>
			</>
		</div>
	)
}
export function FormikVideoPickerBox({ name, children }: props) {
	const formik = useFormikContext<any>()
	const imageRef = useRef<any>(null)

	const onChange = (e: any) => {
		const file = imageRef?.current?.files[0]

		if (file) {
			const fileReader: FileReader = new FileReader()

			fileReader.onload = (event: any) => {
				formik.setFieldValue(name, event.target.result)
			}

			formik.setFieldValue("_imageInfo", imageRef.current.files[0])
		}
	}

	return (
		<div>
			<>
				<label className="text-center" htmlFor={name}>
					<Box
						role="group"
						position="relative"
						display="flex"
						justifyContent="center"
						alignItems="center"
						cursor="pointer"
						height="200px"
						backgroundColor="gray.100"
						borderRadius="lg"
						borderWidth="2px"
						borderColor="gray.300"
						borderStyle="dashed"
					>
						{formik.values[name] ? (
							<Image
								_groupHover={{ filter: "brightness(0.5)" }}
								src={formik.values[name]}
								height="160px"
								width="160px"
								objectFit="cover"
								borderRadius="lg"
							/>
						) : (
							<Box
								opacity={1}
								position="absolute"
								textAlign="center"
								display="flex"
								flexDir="column"
								alignItems="center"
								color="gray.500"
							>
								<FaVideo size="60px" />
								<Text mt={4}>Subir vídeo</Text>
							</Box>
						)}
					</Box>
				</label>
				<input
					ref={imageRef}
					type="file"
					id={name}
					onChange={(e: any) => onChange(e)}
					onBlur={() => formik.setFieldTouched(name)}
					name={name}
					style={{ display: "None" }}
				></input>
			</>
		</div>
	)
}
