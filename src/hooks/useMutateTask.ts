/* eslint-disable */
import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import type { Task, EditTask } from '../types/types'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation<Task, Error, Omit<EditTask, 'id'>>(
    // @ts-ignore
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_REST_URL}/tasks/`, task),
    {
      // @ts-ignore
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            [...previousTodos, res.data],
          )
        }
        dispatch(resetEditedTask())
      },
    },
  )
  const updateTaskMutation = useMutation<Task, Error, EditTask>(
    // @ts-ignore
    (task: EditTask) => {
      return axios
        .put<Task>(`${process.env.REACT_APP_REST_URL}/tasks/${task.id}/`, task)
        .then((res) => res.data)
    },
    {
      onSuccess: (res: any, variables: any) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            previousTodos.map((task) =>
              task.id === variables.id ? res : task,
            ),
          )
        }
        dispatch(resetEditedTask())
      },
    },
  )
  const deleteTaskMutation = useMutation<void, Error, number>(
    // @ts-ignore
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tasks/${id}/`),
    {
      // @ts-ignore
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            previousTodos.filter((task) => task.id !== variables),
          )
        }
        dispatch(resetEditedTask())
      },
    },
  )
  return { deleteTaskMutation, createTaskMutation, updateTaskMutation }
}
