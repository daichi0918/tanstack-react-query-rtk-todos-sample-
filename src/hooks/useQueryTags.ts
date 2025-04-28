import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Tag } from '../types/types'

export const useQueryTags = () => {
  const getTags = async () => {
    const baseUrl = process.env.REACT_APP_REST_URL
    if (!baseUrl) {
      throw new Error('REACT_APP_REST_URL is not defined')
    }
    const { data } = await axios.get<Tag[]>(`${baseUrl}/tags/`)
    return data
  }
  return useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: Infinity,
  })
}
