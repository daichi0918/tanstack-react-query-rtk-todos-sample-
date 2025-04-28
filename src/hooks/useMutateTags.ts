import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTag } from '../slices/todoSlice'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Tag } from '../types/types'

export const useMutateTag = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const createTagMutation = useMutation(
    // @ts-ignore
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${process.env.REACT_APP_REST_URL}/tags/`, tag),
    {
      // @ts-ignore
      onSuccess: (res) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(['tags'], [...previousTags, res.data])
        }
        dispatch(resetEditedTag())
      },
    },
  )
  const updateTagMutation = useMutation(
    // @ts-ignore
    (tag: Tag) =>
      axios.put<Tag>(`${process.env.REACT_APP_REST_URL}/tags/${tag.id}/`, tag),
    {
      // @ts-ignore
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTags.map((tag) =>
              tag.id === variables.id ? res.data : tag,
            ),
          )
        }
        dispatch(resetEditedTag())
      },
    },
  )
  const deleteTagMutation = useMutation(
    // @ts-ignore
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tags/${id}/`),
    {
      // @ts-ignore
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTags.filter((tag) => tag.id !== variables),
          )
        }
        dispatch(resetEditedTag())
      },
    },
  )
  return { deleteTagMutation, createTagMutation, updateTagMutation }
}
