import { FC, memo, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/todoSlice'
import { useQueryTags } from '../hooks/useQueryTag'
import { useMutateTask } from '../hooks/useMutateTask'

const TaskEdit: FC = () => {
  const editedTask = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const { status, data } = useQueryTags()
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else {
      updateTaskMutation.mutate(editedTask)
    }
  }
  const tagOptions = data?.map((tag) => (
    <option key={tag.id} value={tag.id}>
      {tag.name}
    </option>
  ))
  console.log('rendered TaskEdit')
  // if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  // if (updateTaskMutation.isLoading) {
  //   return <span>Updating...</span>
  // }
  // if (createTaskMutation.isLoading) {
  //   return <span>Creating...</span>
  // }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 border border-gray-300 px-3 py-2"
          placeholder="new task ?"
          type="text"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        <button
          className="my-3 mx-3 rounded bg-indigo-600 py-2 px-3 text-white hover:bg-indigo-700 disabled:opacity-40"
          disabled={!editedTask.title || !editedTask.tag}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      <select
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedTask.tag}
        onChange={(e) =>
          dispatch(
            setEditedTask({ ...editedTask, tag: Number(e.target.value) }),
          )
        }
      >
        <option value={0}>Tag</option>
        {tagOptions}
      </select>
    </div>
  )
}
export const TaskEditMemo = memo(TaskEdit)
