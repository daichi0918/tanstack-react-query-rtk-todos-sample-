import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Task } from '../types/types'

export const useQueryTasks = () => {
  const getTasks = async () => {
    const baseUrl = process.env.REACT_APP_REST_URL
    if (!baseUrl) {
      throw new Error('REACT_APP_REST_URL is not defined')
    }
    const { data } = await axios.get<Task[]>(`${baseUrl}/tasks/`)
    return data
  }
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    staleTime: 0,
    refetchOnWindowFocus: true,
    //cacheTime: 5000,
    //refetchInterval: 5000,
  })
}
