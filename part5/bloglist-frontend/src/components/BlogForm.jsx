const BlogForm = ({
  addBlog,
  handleNewBlogTitleChange,
  handleNewBlogAuthor,
  handleNewBlogUrl,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
 }) => {
 return (
   <div>
    <h2>create new</h2>

    <form onSubmit={addBlog}>
      title: <input
        value={newBlogTitle}
        onChange={handleNewBlogTitleChange}
      /><br />
      author: <input
        value={newBlogAuthor}
        onChange={handleNewBlogAuthor}
      /><br />
      url: <input
        value={newBlogUrl}
        onChange={handleNewBlogUrl}
      /><br />
      <button type="submit">create</button>
    </form>
   </div>
 )
}

export default BlogForm