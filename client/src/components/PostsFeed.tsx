import { useQueryPosts } from '../hooks'
import { User } from '../models'
import PostItem from './PostItem'

interface PostsFeedProps {
   userId?: User['id']
}

const PostsFeed: React.FC<PostsFeedProps> = ({ userId }) => {
   const { posts, isLoading } = useQueryPosts(userId)

   if (isLoading) {
      return <div className="text-white">Loading....</div>
   }

   if (posts) {
      return posts.map((post) => <PostItem key={post.id} data={post} />)
   }
}

export default PostsFeed
