describe('Todo App', () => {
  it('loads, adds and removes a todo', () => {
    // Ensure API is up before interacting with UI
    cy.request({
      url: 'http://localhost:5000/api/health',
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true,
    }).its('status').should('eq', 200)

    cy.visit('/')
    cy.contains('h1', 'Todo App').should('be.visible')

    // Add a todo
    cy.get('input[placeholder="Add a todo"]').type('My first todo')
    cy.contains('button', 'Add').click()

    // Should appear in list
    cy.contains('li', 'My first todo').as('todoItem').should('be.visible')

    // Delete it
    cy.get('@todoItem').within(() => {
      cy.contains('button', 'Delete').click()
    })

    // Should be removed
    cy.contains('li', 'My first todo').should('not.exist')
  })
})
