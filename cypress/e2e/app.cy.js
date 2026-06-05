// Front page
describe('App Header', () => {
  it('shows header on non-tools routes', () => {
    cy.visit('/')

    cy.get('header').should('exist')
    cy.contains('Stephen')
  })
})

// Header does not exist when in /tools -- 5 Jun: temporarily hidden; will test on a different app
// describe('/tools route', () => {
//   it('hides header', () => {
//     cy.visit('/tools')

//     cy.get('header').should('not.exist')
//   })
// })

// Menu behavior
describe('Hamburger menu', () => {
  it('opens menu when clicked', () => {
    cy.visit('/')

    cy.get('.hamburger')
      .click()

    cy.get('#menu')
      .should('exist')

    cy.get('#router')
      .should('not.exist')
  })
})

it('closes menu when clicked twice', () => {
  cy.visit('/')

  cy.get('.hamburger').click()

  cy.get('#menu')
    .should('exist')

  cy.get('.hamburger').click()

  cy.get('#router')
    .should('exist')
})

it('adds active class when menu is open', () => {
  cy.visit('/')

  cy.get('.hamburger')
    .click()
    .should('have.class', 'hamburger--active')
})

it('closes menu after navigation', () => {
  cy.visit('/')

  cy.get('.hamburger').click()

  cy.get('#menu')
    .should('exist')

  cy.visit('/tools')

  cy.get('#menu')
    .should('not.exist')
})

// Tests on dark mode -- 5 Jun: temporarily hidden; will test on a different app
// it('applies dark mode class', () => {
//   cy.visit('/', {
//     onBeforeLoad(win) {
//       win.localStorage.setItem(
//         'ui',
//         JSON.stringify({
//           isDark: true
//         })
//       )
//     }
//   })

//   cy.get('body')
//   cy.get('.dark-mode')
//     .should('exist')
// })

// Website title changes on /title and other pages -- 5 Jun: temporarily hidden; will test on a different app
// it('sets title on home page', () => {
//   cy.visit('/')

//   cy.window().then((win) => {
//     win.dispatchEvent(new Event('focus'))
//   })

//   cy.title()
//     .should('eq', 'Stephen Johnson-Tseu')
// })

// it('sets title on tools page', () => {
//   cy.visit('/tools')

//   cy.window().then((win) => {
//     win.dispatchEvent(new Event('focus'))
//   })

//   cy.title()
//     .should('eq', 'Tools')
// })
