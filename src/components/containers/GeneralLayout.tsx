import Header from "@components/navigation/Header"
import { Sidebar, SidebarContainer, SidebarTitle, SidebarElement, SidebarMenu, SidebarDivider } from "@components/navigation/MainSidebar"
import React from "react"
import { BiBarChart, BiBot, BiCalendar, BiCar, BiCog, BiCreditCardFront, BiHome, BiStore, BiUserCircle, BiUserPin } from "react-icons/bi"
import { Outlet } from "react-router-dom"

export default function GeneralLayout() {
	return (
		<>
			<Sidebar>
				<Header></Header>
				<SidebarMenu>
					<SidebarTitle name="GENERAL"></SidebarTitle>
					<SidebarElement name="Inicio" icon={BiHome} href="/home"></SidebarElement>

					<SidebarDivider></SidebarDivider>
					<SidebarTitle name="TU GESTIÓN"></SidebarTitle>
					<SidebarElement name="Alumnos" icon={BiUserCircle} href="/students"></SidebarElement>
					<SidebarElement name="Calendario" icon={BiCalendar} href="/calendar"></SidebarElement>
					<SidebarElement name="Procesos" icon={BiBot} href="/processes"></SidebarElement>
					<SidebarDivider></SidebarDivider>

					<SidebarTitle name="TU NEGOCIO"></SidebarTitle>
					<SidebarElement name="Equipo" icon={BiUserPin} href="/employees"></SidebarElement>
					<SidebarElement name="Vehiculos" icon={BiCar} href="/vehicles"></SidebarElement>
					<SidebarElement name="Oficinas" icon={BiStore} href="/offices"></SidebarElement>
					<SidebarElement name="Permisos" icon={BiCreditCardFront} href="/permissions"></SidebarElement>
					<SidebarElement name="Métricas" icon={BiBarChart} href="/metrics"></SidebarElement>
					<SidebarElement name="Configuración" icon={BiCog} href="/config"></SidebarElement>
					<SidebarDivider></SidebarDivider>
				</SidebarMenu>
				<SidebarContainer>{<Outlet></Outlet>}</SidebarContainer>
			</Sidebar>
		</>
	)
}
