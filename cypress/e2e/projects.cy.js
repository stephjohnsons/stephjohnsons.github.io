it('loads projects page', () => {
  cy.visit('/projects')

  cy.contains('Past Musical Projects and Concerts')
})

it('loads project data', () => {
  cy.visit('/projects')

  cy.contains('Loading projects...').should('not.exist')

  cy.get('h5').should('have.length.greaterThan', 0)
})

// Ongoing projects
it('filters ongoing projects', () => {
  cy.visit('/projects')

  cy.contains('button', 'Ongoing')
    .click()

  cy.contains('Ongoing')
    .should('exist')
})

it('shows ongoing badge for ongoing projects', () => {
  cy.visit('/projects')

  cy.contains('.badge', 'Ongoing')
})

// Clears filters 
it('clears all filters', () => {
  cy.visit('/projects')

  cy.get('select').select('Teaching')

  cy.contains('button', 'Clear all filters')
    .click()

  cy.get('select')
    .should('have.value', '')
})

// Password modal for admin
it('opens auth modal', () => {
  cy.visit('/projects')

  cy.contains('Edit')
    .click()

  cy.contains('Enter password to edit')
})

it('closes auth modal', () => {
  cy.visit('/projects')

  cy.contains('Edit').click()

  cy.contains('Cancel').click()

  cy.contains('Enter password to edit')
    .should('not.exist')
})
