import { FormikButton } from ".."
import FormikForm from "../FormikForm"
import React from "react"
import FormikToggleList from "./FormikInputCopy"

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "components/forms/FormikInputCopy",
	component: FormikToggleList,
}

export const Primary = () => (
	<FormikForm
		initialValues={{ pepe: "pepe" }}
		onSubmit={(data) => {
			console.log(data)
		}}
	>
		<FormikToggleList fontSize="sm" name="pepe" variant="primary" />

		<FormikButton></FormikButton>
	</FormikForm>
)
export const Multiple = () => (
	<FormikForm
		initialValues={{ pepe: "pepe" }}
		onSubmit={(data) => {
			console.log(data)
		}}
	>
		<FormikToggleList name="pepe" fontSize="sm" />
		<FormikButton></FormikButton>
	</FormikForm>
)
