describe('Login with user', () => {
  it('Write email and password and try to login', () => {
    cy.visit('/');
    cy.get('#input_login_email').type('jowi@gmail.com');
    cy.get('#input_login_password').type('12345678');
    cy.get('#login-btn').click();
  });
});