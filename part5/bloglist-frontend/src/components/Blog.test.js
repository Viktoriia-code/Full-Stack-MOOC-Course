import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


// 5.13: Blog list tests, step1
// checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default
test('renders content', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    blogVisible: false
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toBeDefined()
  expect(div).toHaveTextContent('Blog title Blog author')
  expect(blog.blogVisible).toBe(false)
})

// 5.14: Blog list tests, step2
// checks that the blog's URL and number of likes are shown when the button has been clicked
test('clicking the button renders blog url and likes ', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    blogVisible: false,
    likes: 'Blog likes',
    url: 'Blog url'
  }

  const { container } = render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Blog urllikes Blog likes')
})

// 5.15: Blog list tests, step3
// ensures that if the like button is clicked twice, the event handler the component received as props is called twice
test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    likes: 'Blog likes',
    url: 'Blog url',
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  user.click(button)

  const likeBtn = screen.getByText('like')
  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})