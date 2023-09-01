/**
 * Class representing basic functionality across all pages.
 *
 * @export BasePage
 * @class BasePage
 */
// @ts-ignore
import * as dayjs from 'dayjs';

export class BasePage {
  private searchFormDiv() {
    return cy.get('div[data-testid="multi-product-search-form"]');
  }
  private searchFormStaysTabLink() {
    return cy.get('a[aria-controls="search_form_product_selector_lodging"]');
  }
  private searchFormFlightsTabLink() {
    return cy.get('a[aria-controls="search_form_product_selector_flights"]');
  }
  private searchFormDataPickerButton() {
    return cy.get('button[data-stid="open-date-picker"]');
  }

  /**
   * Visit Homepage
   *
   * @return {void}
   */
  public visitHomepage(): void {
    cy.visit('/');
    cy.wait('@vaclog');
    // Click on empty space (search form div) to remove pop-ups
    this.searchFormDiv().click('topLeft');
    this.searchFormDataPickerButton();
  }

  /**
   * Go to the Stays tab by clicking this option in Search Form bar
   *
   * @return {void}
   */
  public goToStaysTab(): void {
    this.searchFormStaysTabLink().click();
    this.searchFormStaysTabLink().invoke('attr', 'aria-selected').should('eq', 'true');
  }

  /**
   * Go to the Flights tab by clicking this option in Search Form bar
   *
   * @return {void}
   */
  public goToFlightsTab(): void {
    this.searchFormFlightsTabLink().click();
    this.searchFormFlightsTabLink().invoke('attr', 'aria-selected').should('eq', 'true');
  }

  /**
   * Get current date in 'MMM D' format (for example 'Spe 14')
   *
   * @return {string}
   */
  public getCurrentDateInMmmdFormat(): string {
    return dayjs(Date.now()).format('MMM D');
  }

  /**
   * Get current URL
   *
   * @return {Promise<string>}
   */
  public getCurrentURL(): Promise<string> {
    return new Cypress.Promise((resolve) => {
      cy.url().then((url) => {
        resolve(url);
      });
    });
  }
}
