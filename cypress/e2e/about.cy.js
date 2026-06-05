describe('About Page', () => {
  it('loads biography section', () => {
    cy.visit('/about')

    cy.contains('Biography')
    cy.contains('English')
    cy.contains('中文')
  })
})

it('defaults to English', () => {
  cy.visit('/about')

  cy.contains('button', 'English')
    .should('have.class', 'btn-warning')

  cy.contains('button', '中文')
    .should('have.class', 'btn-outline-dark')
})

it('switches language to Chinese', () => {
  cy.visit('/about')

  cy.contains('button', '中文')
    .click()

  cy.contains('button', '中文')
    .should('have.class', 'btn-warning')

  cy.contains('button', 'English')
    .should('have.class', 'btn-outline-dark')
})

it('changes biography text when language changes', () => {
  cy.visit('/about')

  cy.get('p')
    .first()
    .invoke('text')
    .then((englishText) => {

      cy.contains('button', '中文').click()

      cy.get('p')
        .first()
        .invoke('text')
        .should((chineseText) => {
          expect(chineseText).not.to.eq(englishText)
        })
    })
})
