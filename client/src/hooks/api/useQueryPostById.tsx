import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../../services'
import { Post } from '../../models'

const useQueryPostById = (id: Post['id']) => {
   const { data, isError, isLoading } = useQuery({
      queryKey: ['get-post', id],
      queryFn: () => getPostById(id),
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      post: data?.post,
      isError,
      isLoading,
   }
}

export default useQueryPostById
