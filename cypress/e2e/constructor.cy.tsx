/// <reference types="cypress" />

const burgerConstructor = '[data-cy="burgerConstructor"]';
const main = '[data-cy="main"]:first-of-type';
const bun = '[data-cy="bun"]:first-of-type';
const sauce = '[data-cy="sauce"]:first-of-type';
const modalCloseButton = '[data-cy="modalCloseButton"]';
const modalOverlay = '[data-cy="modalOverlay"]';
const orderButton = '[data-cy="orderButton"]';
const orderNumber = '[data-cy="orderNumber"]';

describe('проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('ингредиент должен добавляться в коструктор', () => {
    cy.get(main).contains('Добавить').click();
    cy.get(burgerConstructor).should('contain', "Ингридиент 2");
    cy.get(sauce).contains('Добавить').click();
    cy.get(burgerConstructor).should('contain', "Ингридиент 4");
    });
  it('булка должна добавляться в коструктор', () => {
    cy.get(bun).contains('Добавить').click();
    cy.get(burgerConstructor).should('contain', "Ингридиент 1");
    });
});


describe('тесты модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('открывается модальное окно при клике на ингредиент', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains("Ингридиент 1").click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains("Ингридиент 1").should('exist');

  });

  it('закрывается при клике на крестик', () => {
    cy.contains("Ингридиент 1").click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(modalCloseButton).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('закрывается при клике оверлей', () => {
    cy.contains("Ингридиент 1").click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(modalOverlay).click('right',{ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('тесты оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' });
    
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('сборка бургера для заказа', () => {
    cy.get(bun).contains('Добавить').click();
    cy.get(main).contains('Добавить').click();
    cy.get(sauce).contains('Добавить').click();
    cy.get(orderButton).click();
    cy.get(orderNumber).contains('1234').should('exist');

    cy.get(modalCloseButton).click();
    cy.get(orderNumber).should('not.exist');

    cy.get(burgerConstructor)
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get(burgerConstructor)
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get(burgerConstructor)
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});