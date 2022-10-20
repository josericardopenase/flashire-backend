import EmployeeService from "@api/users/employees"
import TeacherProfileService from "@api/users/teacherProfile"
import { Flex, Heading } from "@chakra-ui/react"
import ReturnButton from "@components/buttons/ReturnButton"
import PageContainer from "@components/containers/PageContainer"
import ProfileUpdateAvatar from "@components/forms/ProfileUpdateAvatar"
import HorizontalNavigation from "@components/navigation/HorizontalNavigation"
import DavinciLoader from "@components/other/DavinciLoader/DavinciLoader"
import React from "react"
import { Outlet, useParams } from "react-router-dom"

export default function index() {
	const { id } = useParams()
	const { data, status } = EmployeeService.useRetrieve(id)
	const { mutateAsync } = EmployeeService.useUpdate()
	const teacher = TeacherProfileService.useRetrieve(data?.teacher_profile)

	return (
		<DavinciLoader status={teacher.status}>
			<DavinciLoader status={status}>
				<PageContainer detailed>
					<Flex alignItems="center" mb="5">
						<ReturnButton></ReturnButton>
						<ProfileUpdateAvatar
							onUpdate={async (avatar) => await mutateAsync({ id: data?.id, avatar: avatar })}
							mr="3"
							ml="3"
							src={data?.avatar ?? ""}
							name={data?.first_name + " " + data?.last_name}
						/>
						<Heading>
							{data?.first_name} {data?.last_name}
						</Heading>
					</Flex>
					<HorizontalNavigation
						tabs={[
							{
								title: "Area de profesor",
								href: "teacher",
							},
							{
								title: "Horarios",
								href: "schedule",
							},
							{
								title: "Datos",
								href: "config",
							},
						]}
					></HorizontalNavigation>
					<Outlet></Outlet>
				</PageContainer>
			</DavinciLoader>
		</DavinciLoader>
	)
}
