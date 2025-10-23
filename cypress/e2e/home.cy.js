describe('Basic app', () => {
  it('loads the home page and shows title', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]').should('contain.text', 'Hello, World!')
  })

  it('increments the counter when button is clicked', () => {
    cy.visit('/')
    cy.get('[data-cy="count"]').should('have.text', '0')
    cy.get('[data-cy="increment"]').click().click()
    cy.get('[data-cy="count"]').should('have.text', '2')
  })
})
