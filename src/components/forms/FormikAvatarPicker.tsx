import { Avatar, AvatarProps, Flex, Box } from "@chakra-ui/react"
import { useField } from "formik"
import React from "react"
import { FormikBase } from "./FormikControl"

interface props extends FormikBase, AvatarProps {
	name: string
}

const avatars = [
	"https://img2.freepng.es/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
	"https://cdn-icons-png.flaticon.com/512/147/147144.png",
	"http://cemokalab.com/wp-content/uploads/2015/07/avatar-372-456324.png",
	"https://www.mapachehosting.com/img/avatars/avatar4.png",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZEu8Z9gtekyG1fHGuJidolsHv38kcTcS20HqZ0Ju-YKLfUWMyuz8GATQ_obgtrvIr2j8&usqp=CAU",
	"https://cdn-icons-png.flaticon.com/512/219/219969.png",
	"https://cdn-icons-png.flaticon.com/512/219/219982.png",
	"http://cemokalab.com/wp-content/uploads/2015/07/avatar-369-456321.png",
	"https://e7.pngegg.com/pngimages/109/994/png-clipart-teacher-student-college-school-education-avatars-child-face.png",
]

export default function FormikAvatarPicker(props: props) {
	const [field, meta, helpers] = useField(props.name)
	return (
		<Flex direction="column" alignItems="center" justifyContent="center">
			<Avatar {...props} src={field.value} name="" />
			<Flex mt="3">
				{avatars.map((x, y) => (
					<Box key={y} borderWidth="2px" p="1" borderColor={x === field.value ? "brand.500" : "transparent"} ml="4" borderRadius="50%">
						<Avatar cursor="pointer" onClick={() => helpers.setValue(x)} src={x} />
					</Box>
				))}
			</Flex>
		</Flex>
	)
}
