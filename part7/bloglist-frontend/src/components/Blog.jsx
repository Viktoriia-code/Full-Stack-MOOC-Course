import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <tr key={blog.id} className="blog">
      <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></td>
    </tr>
  )
}

export default Blog
