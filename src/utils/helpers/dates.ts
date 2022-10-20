import moment from "moment"

export const getDaysInMonth = (month: number) => {
	return moment(month, "MM").daysInMonth()
}

function formatTwoDigits(x: number) {
	return x.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
}

export function toParsedDate(year: number, month: number, day: number) {
	return moment(`${year}${formatTwoDigits(month + 1)}${formatTwoDigits(day + 1)}`, "YYYYMMDD").toString()
}

export function getFirstWeekDay(year: number, month: number) {
	// get the first day of the specified month and year

	const first_working_day = moment(`${year}${formatTwoDigits(month + 1)}01`, "YYYYMMDD")
	return first_working_day.weekday()
}
