import React, { useRef } from "react"
import { AvatarProps, Avatar } from "@chakra-ui/react"

interface props extends AvatarProps {
	onUpdate: (avatar: string) => any
}

export default function ProfileUpdateAvatar({ onUpdate, ...props }: props) {
	const imageRef = useRef<any>(null)

	const onChange = async (e: any) => {
		const file = imageRef?.current?.files[0]

		if (file) {
			const fileReader: FileReader = new FileReader()
			fileReader.readAsDataURL(file)
			fileReader.onload = (event: any) => {
				onUpdate(event.target.result)
			}
		}
	}

	return (
		<div>
			<>
				<label className="text-center" htmlFor={"profile"}>
					<Avatar cursor="pointer" _hover={{ filter: "brightness(0.7)" }} {...props}></Avatar>
				</label>
				<input
					ref={imageRef}
					type="file"
					id={"profile"}
					onChange={(e: any) => onChange(e)}
					name={"profile"}
					style={{ display: "None" }}
				></input>
			</>
		</div>
	)
}
