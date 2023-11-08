import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const whiteBg = {
    background: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10
  }

  return (
    <div style={whiteBg}>
      <h2>create new</h2>

      <Form onSubmit={addBlog}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
          <Form.Label column sm={1}>title:{' '}</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Title"
              value={newBlogTitle}
              onChange={({ target }) => setNewBlogTitle(target.value)}
              id="title-input" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAuthor">
          <Form.Label column sm={1}>author:{' '}</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Author"
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
              id="author-input" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalUrl">
          <Form.Label column sm={1}>url:{' '}</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Url"
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
              id="url-input" />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">create new blog</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
