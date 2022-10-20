import { Formik, FormikConfig, FormikProps, FormikValues } from "formik"
import React from "react"

export interface IFormikForm extends Omit<FormikConfig<FormikValues>, "children"> {
	children: React.ReactNode | ((props: FormikProps<FormikValues>) => React.ReactNode)
}

function FormikForm({ children, ...props }: IFormikForm) {
	/**
	 *
	 * FormikForm:
	 *
	 * Formulario de formik al que se le añade el KeyboardAvoidingView para
	 * evitar que los inputs se solapen.
	 *
	 * @param children: hijos del formulario
	 * @param containerProps: estilos del contenedor
	 *
	 */

	return (
		<Formik {...props}>{(formik) => <form style={{ width: "100%" }}>{children instanceof Function ? children(formik) : children}</form>}</Formik>
	)
}

export default FormikForm
