import React from "react"
import "./App.css"
import { Box, ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"
import Statistics from "./pages/Statistics"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import StatisticsTraffic from "./pages/Statistics/pages/StatisticsTraffic"
import StatisticsGeneral from "./pages/Statistics/pages/StatisticsGeneral"
import { QueryClientProvider } from "react-query"
import Register from "@pages/Register"
import GeneralLayout from "@components/containers/GeneralLayout"
import Offices from "@pages/Offices"
import queryClient from "@davinci/clients/queryClient"
import GoogleMapsProvider from "@components/providers/GoogleMapsProvider"
import OfficeDetailed from "@pages/Offices/pages/OfficeDetailed"
import Vehicles from "@pages/Vehicles"
import VehicleDetailed from "@pages/Vehicles/pages/VehicleDetailed"
import Employees from "@pages/Employees"
import EmployeesDetailed from "@pages/Employees/pages/EmployeesDetailed"
import PrivateRoute from "@components/other/PrivateRoute"
import { Provider } from "react-redux"
import store from "@storage/store"
import Login from "@pages/Login"
import AuthProvider from "@components/providers/AuthProvider"
import UserProvider from "@components/providers/UserProvider"
import NoAuthRoute from "@components/other/NoAuthRoute"
import TeacherDetailedProfile from "@pages/Employees/pages/TeacherDetailed/pages/TeacherDetailedProfile"
import TeacherDetailedSchedule from "@pages/Employees/pages/TeacherDetailed/pages/TeacherDetailedSchedule"
import TeacherDetailedData from "@pages/Employees/pages/TeacherDetailed/pages/TeacherDetailedData"
import Permission from "@pages/Permissions"
import PermissionDetailed from "@pages/Permissions/pages/PermissionDetailed"

function App() {
	return (
		<GoogleMapsProvider>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<AuthProvider>
							<UserProvider>
								<BrowserRouter>
									<Routes>
										<Route
											path="login"
											element={
												<NoAuthRoute>
													<Login />
												</NoAuthRoute>
											}
										/>
										<Route path="register" element={<Register></Register>} />
										<Route
											path=""
											element={
												<PrivateRoute>
													<GeneralLayout></GeneralLayout>
												</PrivateRoute>
											}
										>
											<Route path="home" element={<Box />}></Route>
											<Route path="students" element={<Box />}></Route>
											<Route path="calendar" element={<Box />}></Route>
											<Route path="employees">
												<Route index element={<Employees />}></Route>
												<Route path=":id" element={<EmployeesDetailed />}>
													<Route path="summary" element={<Box />}></Route>
													<Route path="config" element={<TeacherDetailedData />}></Route>
													<Route path="schedule" element={<TeacherDetailedSchedule />}></Route>
													<Route path="teacher" element={<TeacherDetailedProfile />}></Route>
													<Route index element={<Navigate replace={true} to="config" />} />
												</Route>
											</Route>
											<Route path="permissions">
												<Route index element={<Permission />}></Route>
												<Route path=":id" element={<PermissionDetailed />}></Route>
											</Route>
											<Route path="processes" element={<Box />}></Route>
											<Route path="config" element={<Box />}></Route>
											<Route path="vehicles">
												<Route index element={<Vehicles />}></Route>
												<Route path=":id" element={<VehicleDetailed />}></Route>
											</Route>
											<Route path="offices">
												<Route index element={<Offices />}></Route>
												<Route path=":id" element={<OfficeDetailed />}></Route>
											</Route>
											<Route path="metrics" element={<Statistics></Statistics>}>
												<Route index={true} element={<StatisticsGeneral></StatisticsGeneral>}></Route>
												<Route path="traffic" element={<StatisticsTraffic></StatisticsTraffic>}></Route>
											</Route>
										</Route>
									</Routes>
								</BrowserRouter>
							</UserProvider>
						</AuthProvider>
					</Provider>
				</QueryClientProvider>
			</ChakraProvider>
		</GoogleMapsProvider>
	)
}

export default App
