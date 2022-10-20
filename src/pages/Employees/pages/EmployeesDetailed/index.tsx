import EmployeeService from "@api/users/employees"
import React from "react"
import { useParams } from "react-router-dom"
import ManagerDetailed from "../ManagerDetailed"
import SecretaryDetailed from "../SecretaryDetailed"
import TeacherDetailed from "../TeacherDetailed"

export default function index() {
	const { id } = useParams()
	const { data, status } = EmployeeService.useRetrieve(id)

	switch (data?.role) {
		case "TEACHER":
			return <TeacherDetailed></TeacherDetailed>
			break
		case "SECRETARY":
			return <SecretaryDetailed></SecretaryDetailed>
			break
		default:
			return <ManagerDetailed></ManagerDetailed>
			break
	}
}
