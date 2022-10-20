import { MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";

interface options {
	label: string | React.ReactNode;
	value?: any;
	default?: boolean;
}

interface props {
	name: string;
	multiple?: boolean;
	title?: string;
	options: options[];
}

export default function FormikFilterMenu({
	name,
	multiple,
	title,
	options,
}: props) {
	const [field, helpers, meta] = useField(name);
	const formik = useFormikContext();

	function remove() {
		const val: any = formik.values;
		delete val[name];
		formik.setValues(val);
		formik.submitForm();
	}

	return (
		<MenuOptionGroup
			maxHeight="700px"
			onChange={(e) => (e === "default" ? remove() : meta.setValue(e))}
			title={title}
			type={multiple ? "checkbox" : "radio"}
		>
			{options.map((x, i) => (
				<MenuItemOption key={i} value={x.default ? "default" : x.value}>
					{x.label}
				</MenuItemOption>
			))}
		</MenuOptionGroup>
	);
}
