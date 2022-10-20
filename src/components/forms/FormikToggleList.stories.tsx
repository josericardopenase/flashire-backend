import { FormikButton } from "."
import FormikForm from "./FormikForm"
import React from "react"
import FormikToggleList from "./FormikToggleList"

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: "components/forms/FormikToggleList",
	component: FormikToggleList,
}

export const Primary = () => (
	<FormikForm
		initialValues={{ pepe: "fc" }}
		onSubmit={(data) => {
			console.log(data)
		}}
	>
		<FormikToggleList
			name="pepe"
			fontSize="sm"
			options={[
				{ label: "Instagram", value: "ig" },
				{ label: "Facebook", value: "fc" },
				{ label: "Twitter", value: "tw" },
				{ label: "Motherfucker", value: "mt" },
			]}
		/>
		<FormikButton></FormikButton>
	</FormikForm>
)
export const Multiple = () => (
	<FormikForm
		initialValues={{ pepe: [] }}
		onSubmit={(data) => {
			console.log(data)
		}}
	>
		<FormikToggleList
			multiple
			name="pepe"
			fontSize="sm"
			options={[
				{ label: "Instagram", value: "ig" },
				{ label: "Facebook", value: "fc" },
				{ label: "Twitter", value: "tw" },
				{ label: "Motherfucker", value: "mt" },
			]}
		/>
		<FormikButton></FormikButton>
	</FormikForm>
)
