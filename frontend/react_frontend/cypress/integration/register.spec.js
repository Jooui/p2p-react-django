let makeUsername = (length) => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return "test_" + result.join('');
}


describe('Register with user', () => {
    it('Write email and password and try to login', () => {
        let randUsername = makeUsername(5)
        cy.visit('/');
        cy.get('#register-link').click();
        cy.get('#input_register_username').type(randUsername);
        cy.get('#input_register_email').type(randUsername + '@gmail.com');
        cy.get('#input_register_password').type('12345678');
        cy.get('#register-btn').click();
    });
});