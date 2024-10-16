import { useQueryPosts } from '../hooks'
import { User } from '../models'
import PostItem from './PostItem'
import Spinner from './Spinner'

interface PostsFeedProps {
   userId?: User['id']
}

const PostsFeed: React.FC<PostsFeedProps> = ({ userId }) => {
   const { posts, isLoading } = useQueryPosts(userId)

   if (isLoading) {
      return <Spinner />
   }

   if (posts) {
      return posts.map((post) => <PostItem key={post.id} data={post} />)
   }
}

export default PostsFeed
