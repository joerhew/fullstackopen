/* eslint-disable no-undef */

describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })

  describe('Login', function() {
    beforeEach(function() {
      const user = {
        name: 'Maud Rhew',
        username: 'maud',
        password: 'rhew'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('maud')
      cy.get('#password').type('rhew')
      cy.contains('Login').click()

      cy.get('.notification')
        .should('contain', 'Maud Rhew')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('maud')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Maud Rhew logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'Maud Rhew',
        username: 'maud',
        password: 'rhew'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

      cy.login({ username: 'maud', password: 'rhew' })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.contains('title').find('input').type('cypress hill')
      cy.contains('author').find('input').type('Maudlet')
      cy.contains('url').find('input').type('www.maudlet.org')
      cy.get('#createBlog').click()

      cy.get('.notification')
        .should('contain', 'a new blog cypress hill by Maudlet has been added.')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When a user has created a blog', function() {
    beforeEach(function() {
      const firstUser = {
        name: 'Maud Rhew',
        username: 'maud',
        password: 'rhew'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, firstUser)

      const secondUser = {
        name: 'Felix Rhew',
        username: 'felix',
        password: 'rhew'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, secondUser)

      cy.login({ username: 'maud', password: 'rhew' })
        .then(() => {
          return cy.createBlog({
            title: 'cypress',
            author: 'Beatrice',
            url: 'www.beatrice.co'
          })
        })
    })

    it('A user can like a blog', function() {
      cy.contains('Expand').click()
      cy.contains('Like').click()

      cy.get('html')
        .should('contain', 'Likes: ')
        .and('contain', '1')
    })

    it('The user who created the blog can delete it', function() {
      cy.contains('Expand').click()
      cy.contains('Delete').click()

      cy.get('html')
        .should('not.contain', 'Beatrice')
    })

    it('A user who did not create the blog cannot delete it', function() {
      cy.contains('Logout').click()
      cy.login({ username: 'felix', password: 'rhew' })
      cy.contains('Expand').click()

      cy.get('html')
        .should('not.contain','Delete')
    })

    it.only('Blogs should be ordered by the number of likes', function() {
      cy.createBlog({
        title: 'one likes',
        author: 'one',
        url: 'www.one.com'
      })

      cy.createBlog({
        title: 'two likes',
        author: 'two',
        url: 'www.two.com'
      })

      cy.createBlog({
        title: 'three likes',
        author: 'three',
        url: 'www.three.com'
      })

      cy.contains('three').parent().contains('Expand').click()
      cy.contains('three').parent().contains('Like').click()
      cy.contains('three').parent().contains('Collapse').click()

      cy.contains('two').parent().contains('Expand').click()
      cy.contains('two').parent().contains('Like').click()
      cy.contains('two').parent().contains('Collapse').click()

      cy.contains('one').parent().contains('Expand').click()
      cy.contains('one').parent().contains('Like').click()
      cy.contains('one').parent().contains('Collapse').click()

      cy.contains('three').parent().contains('Expand').click()
      cy.contains('three').parent().contains('Like').click()
      cy.contains('three').parent().contains('Collapse').click()

      cy.contains('two').parent().contains('Expand').click()
      cy.contains('two').parent().contains('Like').click()
      cy.contains('two').parent().contains('Collapse').click()

      cy.contains('three').parent().contains('Expand').click()
      cy.contains('three').parent().contains('Like').click()
      cy.contains('three').parent().contains('Collapse').click()

      cy.get('.blogEntry').eq(0)
        .should('contain','three likes')
        .and('not.contain','two likes')
        .and('not.contain','one likes')
        .and('not.contain','cypress')

      cy.get('.blogEntry').eq(1)
        .should('not.contain','three likes')
        .and('contain','two likes')
        .and('not.contain','one likes')
        .and('not.contain','cypress')

      cy.get('.blogEntry').eq(2)
        .should('not.contain','three likes')
        .and('not.contain','two likes')
        .and('contain','one likes')
        .and('not.contain','cypress')

      cy.get('.blogEntry').eq(3)
        .should('not.contain','three likes')
        .and('not.contain','two likes')
        .and('not.contain','one likes')
        .and('contain','cypress')
    })
  })
})