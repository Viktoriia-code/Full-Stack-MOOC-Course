describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const new_user = {
      name: 'new_user',
      username: 'new_user',
      password: 'new_password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', new_user)
    cy.visit('http://localhost:5173')
  })

  // 5.17 Make a test for checking that the application displays the login form by default
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.get('#username')
    cy.contains('password')
    cy.get('#password')
    cy.get('#login-button')
  })

  // 5.18 Test for both successful and unsuccessful logging in
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong_mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  // 5.19 A logged-in user can create a new blog
  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title-input').type('New blog title')
      cy.get('#author-input').type('New blog author')
      cy.get('#url-input').type('New blog url')
      cy.contains('create new blog').click()

      cy.contains('a new blog by added')
      cy.contains('New blog title New blog author')
    })
  })

  // 5.20 A logged-in user can like a new blog
  describe('When logged in and created a blog', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      // create a blog here
      cy.contains('new note').click()
      cy.get('#title-input').type('New blog title')
      cy.get('#author-input').type('New blog author')
      cy.get('#url-input').type('New blog url')
      cy.contains('create new blog').click()
    })

    it('A user can like a blog', function() {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })

  // 5.21 A test for ensuring that the user who created a blog can delete it
  describe('When logged in and created a blog', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      // create a blog here
      cy.contains('new note').click()
      cy.get('#title-input').type('New blog title')
      cy.get('#author-input').type('New blog author')
      cy.get('#url-input').type('New blog url')
      cy.contains('create new blog').click()
    })

    it('A user can delete a blog', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('New blog title New blog author').should('not.exist')
    })
  })

  // 5.22 Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.
  describe('When 2 users logged in and created a blog', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      // create a blog here
      cy.contains('new note').click()
      cy.get('#title-input').type('New blog title')
      cy.get('#author-input').type('New blog author')
      cy.get('#url-input').type('New blog url')
      cy.contains('create new blog').click()
      cy.contains('logout').click()
      cy.visit('http://localhost:5173')
      cy.get('#username').type('new_user')
      cy.get('#password').type('new_password')
      cy.get('#login-button').click()
      cy.contains('new note').click()
      cy.get('#title-input').type('New blog title 2')
      cy.get('#author-input').type('New blog author 2')
      cy.get('#url-input').type('New blog url 2')
      cy.contains('create new blog').click()
    })

    it('A user can like a blog', function() {
      cy.contains('New blog title New blog author').parent().contains('view').click()
      cy.contains('New blog title 2 New blog author 2').parent().contains('view').click()

      cy.contains('New blog title New blog author').parent().contains('remove').should('not.exist')
      cy.contains('New blog title 2 New blog author 2').parent().contains('remove')
    })
  })
})