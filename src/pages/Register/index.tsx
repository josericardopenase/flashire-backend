import { Box, Center } from "@chakra-ui/react";
import {
	Sidebar,
	SidebarContainer,
	SidebarMenu,
} from "@components/navigation/Sidebar";
import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import Bubble1 from "./components/Bubble1";
import Bubble2 from "./components/Bubble2";
import Step from "./components/Step";
import Logo from "@assets/Logo";

interface StepProps {
	name: string;
	component: ((formik: FormikProps<any>) => React.ReactNode)[];
}

const steps: StepProps[] = [
	{
		name: "El conductor",
		component: [
			() => (
				<>
					<Center></Center>
				</>
			),
			() => <></>,
		],
	},
	{
		name: "Tu carnet",
		component: [() => <div>hello</div>],
	},
	{
		name: "Tu plan",
		component: [() => <div>hello</div>],
	},
	{
		name: "Empezamos",
		component: [() => <div>hello</div>],
	},
];

export default function Register() {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<Formik initialValues={{}} onSubmit={() => console.log("submit")}>
			{(formik) => (
				<Sidebar>
					<Box position="absolute" left="0" top="" zIndex="10" p="3">
						<Logo width={140}></Logo>
					</Box>
					<SidebarMenu bgColor="brand.500" padding="15">
						<Box position="relative">
							<Box
								zIndex="-1"
								position="absolute"
								height="100%"
								ml="32px"
								width="1px"
								bgColor="white"
							></Box>
							{steps.map((x, i) => (
								<Step
									key={i}
									title={x.name}
									number={(i + 1).toString()}
									active={currentIndex === i}
								></Step>
							))}
						</Box>
						<Bubble1 />
						<Bubble2 />
					</SidebarMenu>
					<SidebarContainer>
						{steps[currentIndex].component[0](formik)}
					</SidebarContainer>
				</Sidebar>
			)}
		</Formik>
	);
}
