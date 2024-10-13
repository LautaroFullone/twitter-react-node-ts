import { getPostByUser, getPosts } from '../../services/posts.service'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../models'

const useGetPosts = (userId?: User['id']) => {
   const { data, error, isLoading } = useQuery({
      queryKey: ['get-posts'],
      queryFn: userId ? () => getPostByUser(userId) : getPosts,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      users: data,
      error,
      isLoading,
   }
}

export default useGetPosts
