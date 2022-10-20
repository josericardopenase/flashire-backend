import { useFormikContext } from "formik"
import React, { useRef, useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import { BiFile } from "react-icons/bi"
import { downloadBase64AsFile } from "@utils/helpers/json"

interface props {
	name: string
	children?: React.ReactNode
	label?: string
}

export function FormikFilePickerBox({ name, children, label }: props) {
	const formik = useFormikContext<any>()
	const imageRef = useRef<any>(null)
	const [link, setLink] = useState(null)

	const onChange = (e: any) => {
		const file = imageRef?.current?.files[0]
		console.log(file)

		if (file) {
			formik.setFieldValue("_" + name, imageRef.current.files[0])

			const fileReader: FileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = (event: any) => {
				console.log(event.target)
				formik.setFieldValue(name, event.target.result)
			}

			fileReader.readAsDataURL(file)
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
							<Text
								maxW="80%"
								_hover={{ color: "brand.500" }}
								textAlign="center"
								p="4"
								fontWeight="semibold"
								onClick={() => downloadBase64AsFile(formik.values[name])}
							>
								{formik.values["_" + name].name}
							</Text>
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
								<BiFile size="60px"></BiFile>
								<Text mt={4} fontWeight="semibold">
									{label ?? "Subir imagen"}
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
