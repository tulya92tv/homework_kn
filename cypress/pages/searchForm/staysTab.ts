/**
 * Class representing Stays tab on Search Form.
 *
 * @export StaysTab
 * @class StaysTab
 */

import { SearchForm } from './searchForm';

export class StaysTab extends SearchForm {
  private staysGoingToButton() {
    return cy.get('button[data-stid="destination_form_field-menu-trigger"]');
  }
  private staysGoingToSearchInput() {
    return cy.get('input[data-stid="destination_form_field-menu-input"]');
  }
  private staysGoingToOptionslist() {
    return cy.get('li[data-stid="destination_form_field-result-item"]');
  }
  private staysSortBySelect() {
    return cy.get('#sort-filter-dropdown-sort');
  }
  private staysLodgingCardDivs() {
    return cy.get('div[data-stid="lodging-card-responsive"]');
  }
  private staysResultsHeaderMessageDiv() {
    return cy.get('div[data-stid="results-header-message"]');
  }

  /**
   * Select Stays destination by index in Going To field
   *
   * @param  {string} destination - destination
   * @param  {number} index - optionsl, which option to select from dropdown (0 - is the first element)
   * @return {void}
   */
  public selectStaysDestinationByIndex(destination: string, index: number = 0): void {
    let encodedDestination: string = encodeURIComponent(destination);
    let alisName: string = `search_${encodedDestination}`;
    cy.intercept('GET', `**/typeahead/${encodedDestination}?browser=**`).as(`${alisName}`);
    this.staysGoingToButton().click();
    this.staysGoingToSearchInput().click().clear().type(destination);
    cy.wait(`@${alisName}`);
    this.staysGoingToOptionslist().eq(index).click();
  }

  /**
   * Search Stays
   *
   * @return {void}
   */
  public searchStays(): void {
    this.clickSearchButtton();
    cy.url().should('contain', 'Hotel-Search');
    this.staysSortBySelect().should('be.visible');
  }

  /**
   * Visit Stays search results page
   *
   * @param  {string} url
   * @return {void}
   */
  public visitStaysSearchResultsPage(url: string): void {
    cy.visit(url);
    cy.wait('@expediaglobal');
    // Click on empty space (search form div) to remove pop-ups
    this.staysResultsHeaderMessageDiv().click('topLeft');
  }

  /**
   * Verify Stays search results are visible
   *
   * @param  {boolean} isVisible - true - label exists and is visible
   * @param  {number}  resultsNumber - optional, number of search results to verify
   * @return {void}
   */
  public verifyStaysSearchResultsAreVisible(isVisible: boolean, resultsNumber: number = 0): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    const resultsToCheck = resultsNumber > 0 ? resultsNumber - 1 : resultsNumber;
    this.staysLodgingCardDivs().each(($el, index) => {
      if (resultsToCheck >= index) {
        cy.wrap($el).should(assertion);
      }
    });
  }
}
