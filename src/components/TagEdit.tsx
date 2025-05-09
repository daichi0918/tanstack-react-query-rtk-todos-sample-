import { FC, memo, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTag, selectTag } from '../slices/todoSlice'
import { useMutateTag } from '../hooks/useMutateTag'

const TagEdit: FC = () => {
  const editedTag = useAppSelector(selectTag)
  const dispatch = useAppDispatch()
  const { createTagMutation, updateTagMutation } = useMutateTag()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // @ts-ignore
    if (editedTag.id === 0) createTagMutation.mutate(editedTag)
    else {
      // @ts-ignore
      updateTagMutation.mutate(editedTag)
    }
  }
  console.log('rendered TagEdit')
  // if (updateTagMutation.isLoading) {
  //   return <span>Updating...</span>
  // }
  // if (createTagMutation.isLoading) {
  //   return <span>Creating...</span>
  // }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 border border-gray-300 px-3 py-2"
          placeholder="new tag ?"
          type="text"
          onChange={(e) =>
            dispatch(setEditedTag({ ...editedTag, name: e.target.value }))
          }
          value={editedTag.name}
        />
        <button
          className="my-3 mx-3 rounded bg-indigo-600 py-2 px-3 text-white hover:bg-indigo-700 disabled:opacity-40 "
          disabled={!editedTag.name}
        >
          {editedTag.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}
export const TagEditMemo = memo(TagEdit)
