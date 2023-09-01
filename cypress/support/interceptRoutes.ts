/**
 * Methods to assist with routes interception
 *
 * @export InterceptRoutes
 * @class InterceptRoutes
 */

export class InterceptRoutes {
  public static setInterceptRoutes(): void {
    // Save vaclog data
    cy.intercept('POST', '**/vaclog/log').as('vaclog');
    // Save expediaglobal data
    cy.intercept('POST', '**/expediaglobal/**').as('expediaglobal');
    // Get graphql data
    cy.intercept('POST', '**/graphql').as('graphql');
  }
}
