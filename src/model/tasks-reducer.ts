import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.taskStatus
                } : t)
            }
        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            const newState = state
            delete newState[action.payload.id]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {type: 'REMOVE-TASK', payload: {taskId: payload.taskId, todolistId: payload.todolistId}} as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {type: 'ADD-TASK', payload: {title: payload.title, todolistId: payload.todolistId}} as const
}

export const changeTaskStatusAC = (payload: { taskId: string, taskStatus: boolean, todolistId: string }) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {taskId: payload.taskId, taskStatus: payload.taskStatus, todolistId: payload.todolistId}
    } as const
}

export const updateTaskAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {todolistId: payload.todolistId, taskId: payload.taskId, title: payload.title}
    } as const
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type AddTaskActionType = ReturnType<typeof addTaskAC>

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type UpdateTaskTitleActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | UpdateTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType