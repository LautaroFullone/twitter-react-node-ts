import { getPostByUser, getPosts } from '../../services/posts.service'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../models'

const useQueryPosts = (userId?: User['id']) => {
   const { data, error, isLoading } = useQuery({
      queryKey: userId ? ['get-user-posts', userId] : ['get-all-posts'],
      queryFn: userId ? () => getPostByUser(userId) : getPosts,
      staleTime: 20 * 60 * 1000, //20min
      retry: 1,
   })

   return {
      posts: data?.posts,
      error,
      isLoading,
   }
}

export default useQueryPosts
