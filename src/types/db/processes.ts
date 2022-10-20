export interface ProcessView {
	nodes: string[] //node pk
	name: string //name to show
	requirements: string[] //if the nodes presents on these array are not completed this node is not enable
	children: ProcessView[] //array of other nodes,
	assigned?: number[]
}

export interface HistoryObject {
	date: string
	node: string
	user?: number
}

export interface ProcessContext {
	app: string
	default: boolean //si esta a true es el manager del obj
	enabled: boolean //false: borrado
	id: number //id db
	init: string //nodo por donde empieza el proceso
	model: number //obj al q representa el obj
	name: string //nombre del proceso
	process: number
	node: string
	view: ProcessView[] //Array of nodes ordered
	done: string[]
	nodes: Record<any, any> //backend proposes, if auto == true automatic
	relations: Record<any, any> //backend proposes
	unfulfilled: Record<string, string>
	object_name?: string
	object_id: number
	slug: string
}

export interface IAlanNode {
	ç_name?: string
	ç_position?: { x: number; y: number }
	ç_icon?: string
}

export interface IRelationNode {
	next: string
}

export type Nodes = Record<string, IAlanNode>
export type Relations = Record<string, IRelationNode[]>

export interface ProcessView {
	node: string //node pk
	name: string //name to show
	requirements: string[] //if the nodes presents on these array are not completed this node is not enable
	children: ProcessView[] //array of other nodes,
	assigned?: number[]
}

export interface Process {
	id: number //id db
	app: string
	slug: string
	node: string
	name: string //nombre del proceso
	init: string //nodo por donde empieza el proceso
	default: boolean //si esta a true es el manager del obj
	enabled: boolean //false: borrado
	model: number //obj al q representa el obj
	nodes: Nodes //backend proposes, if auto == true automatic
	relations: Relations //backend proposes
	view: ProcessView[] //Array of nodes ordered
	object_name?: string
}
