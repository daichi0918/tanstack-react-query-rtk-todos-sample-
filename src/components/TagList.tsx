import { FC, memo } from 'react'
import { useQueryTags } from '../hooks/useQueryTag'
import { TagItemMemo } from './TagItem'
// import { useQueryClient } from '@tanstack/react-query'
// import { Tag } from '../types/types'
const TagList: FC = () => {
  const { status, data } = useQueryTags()
  // const queryClient = useQueryClient()
  // const data = queryClient.getQueryData<Tag[]>(['tags'])
  console.log('rendered TagList')
  // if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <div>
      {data?.map((tag) => (
        <div key={tag.id}>
          <ul>
            <TagItemMemo tag={tag} />
          </ul>
        </div>
      ))}
    </div>
  )
}
export const TagListMemo = memo(TagList)
