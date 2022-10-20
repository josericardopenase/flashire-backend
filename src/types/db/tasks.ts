export interface Task {
	id: number
	name: string
	node: string
	finished: boolean
	due_date?: Date
	created?: Date
	completion_date?: Date
	status: "to_do" | "to_approve" | "done"
	process: number
	finished_by?: number
	users: number[]
	model: string
	task_object: number
	app_label: string
	assignment_types: { group: string; weight: number }[]
}

export interface TaskComment {
	body: string
	author: number
	timestamp: Date
	id: string
	readed_by?: number[]
}
