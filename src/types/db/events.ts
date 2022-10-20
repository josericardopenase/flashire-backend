import { DateInput } from "@fullcalendar/react"

export interface Event {
	id: number
	all_day: boolean
	start: DateInput | undefined
	end: DateInput | undefined
	title: string
	url: string
	class_name: string[]
	editable: boolean
	start_editable: boolean
	duration_editable: boolean
	resource_editable: boolean
	display: string
	overlap: string
	constraint: string
	background_color: string
	border_color: string
	text_color: string
	extended_props: any
	source: string
	days_of_week: number[]
	interactive: boolean
	group: string
}

export function eventToFullCalendar(obj: Event) {
	return {
		title: obj.title,
		start: obj.start,
		end: obj.end,
		url: obj.url,
		editable: obj.editable,
		display: obj.display,
		textColor: obj.text_color,
		backgroundColor: obj.background_color,
	}
}

export function fullCalendarToEvent(obj: any) {
	return {
		title: obj.title,
		start: obj.start,
		end: obj.end,
		url: obj.url,
		editable: obj.editable,
		display: obj.display,
		text_color: obj.textColor,
		background_color: obj.backgroundColor,
	}
}
