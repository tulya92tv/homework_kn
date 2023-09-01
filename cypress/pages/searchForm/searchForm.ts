/**
 * Class representing general functionality of Search Form
 *
 * @export SearchForm
 * @class SearchForm
 */

import { BasePage } from '../basePage';

export class SearchForm extends BasePage {
  private searchFormDatesButton() {
    return cy.get('button[data-stid="open-date-picker"]');
  }
  private startDateInput() {
    return cy.get('input[data-stid="EGDSDateRangePicker-StartDate"]');
  }
  private endDateInput() {
    return cy.get('input[data-stid="EGDSDateRangePicker-EndDate"]');
  }
  private searchButton() {
    return cy.get('#search_button');
  }
  private searchFormAllTabsLinks() {
    return cy.get('div[data-testid="multi-product-search-form"]').find('a');
  }
  private searchFormTravelersButton() {
    return cy.get('button[data-stid="open-room-picker"]');
  }
  private travelersAdultsOrChildrenInput(population: string, roomIndex: number) {
    return cy.get(`input[id="traveler_selector_${population}_step_input-${roomIndex}"]`);
  }
  private travelersDecreaseButton(population: string, roomIndex: number) {
    return cy.get(`title[id="traveler_selector_${population}_step_input-${roomIndex}-decrease-title"]`).parents('button');
  }
  private travelersincreaseButton(population: string, roomIndex: number) {
    return cy.get(`title[id="traveler_selector_${population}_step_input-${roomIndex}-increase-title"]`).parents('button');
  }
  private searchFormTravelersChildSelect(roomIndex: number, childIndex: number) {
    return cy.get(`select[id="age-traveler_selector_children_age_selector-${roomIndex}-${childIndex}"]`);
  }
  private searchFormTravelersDoneButton() {
    return cy.get('#traveler_selector_done_button');
  }
  private searchFormTravelersDoneBtnString(): string {
    return 'button[id="traveler_selector_done_button"]';
  }

  /**
   * Click Search button
   *
   * @return {void}
   */
  public clickSearchButtton(): void {
    this.searchButton().click();
  }

  /**
   * Set dates in Search Form tabs by values
   * This method does not open calendar to select dates.
   * Use XXX method to set dates using calendar.
   *
   * @param  {string} startDate - optional, use 'YYYY-MM-DD' format
   * @param  {string} endDate - optional, use 'YYYY-MM-DD' format
   * @return {void}
   */
  public setSearchFormDates(startDate?: string, endDate?: string): void {
    if (startDate !== undefined) {
      this.startDateInput().invoke('prop', 'value', startDate);
    }
    if (endDate !== undefined) {
      this.endDateInput().invoke('prop', 'value', endDate);
    }
  }

  /**
   * Open Travelers modal if it is closed
   *
   * @return {void}
   */
  private openTravelersModal(): void {
    cy.then(() => {
      // Open Travelers modal if it is closed
      if (!Cypress.$(this.searchFormTravelersDoneBtnString()).is(':visible')) {
        this.searchFormTravelersButton().click();
      }
    });
  }

  /**
   * Get adults or children values from their inputs in Travelers modal
   *
   * @param  {boolean} isAdult - true - use adults input, false - use children input
   * @param  {number} roomIndex - optional, room index (0 is the first room)
   * @return {Promise<number>}
   */
  private getAdultsOrChildrenValueFromTravelers(isAdult: boolean, roomIndex: number = 0): Promise<number> {
    const population = isAdult ? 'adult' : 'children';
    return new Cypress.Promise((resolve) => {
      this.travelersAdultsOrChildrenInput(population, roomIndex)
        .invoke('val')
        .then((value) => {
          resolve(Number(value));
        });
    });
  }

  /**
   * Set adults or children number in Travelers modal
   *
   * @param  {number} peopleNumber - optional, number of adults or children
   * @param  {boolean} isAdult - true - use adults input, false - use children input
   * @param  {number} roomIndex - optional, room index (0 is the first room)
   * @return {void}
   */
  public setAdultsOrChildrenInTravelers(peopleNumber: number, isAdult: boolean, roomIndex: number = 0): void {
    const population = isAdult ? 'adult' : 'children';
    this.getAdultsOrChildrenValueFromTravelers(isAdult, roomIndex).then((currentNumber) => {
      if (peopleNumber !== undefined && peopleNumber !== Number(currentNumber) && peopleNumber >= 0) {
        this.openTravelersModal();
        cy.then(() => {
          let i = peopleNumber - Number(currentNumber);
          // There must be at least 1 adult
          let adultsCondition = isAdult ? peopleNumber > 0 : true;

          if (peopleNumber > Number(currentNumber)) {
            for (i; i > 0; i--) {
              this.travelersincreaseButton(population, roomIndex).click();
            }
          }
          if (peopleNumber < Number(currentNumber) && adultsCondition) {
            for (i; i < 0; i++) {
              this.travelersDecreaseButton(population, roomIndex).click();
            }
          }
        });
      }
    });
  }

  /**
   * Select child age in Travelers modal
   *
   * @param  {number[]} childrenAge - optional, children age
   * @param  {number} roomIndex - optional, room index (0 is the first room)
   * @return {void}
   */
  public selectChildAgeInTravelers(childrenAge?: number[], roomIndex: number = 0): void {
    if (childrenAge !== undefined && childrenAge.length) {
      for (let i = 0; i < childrenAge.length; i++) {
        this.searchFormTravelersChildSelect(roomIndex, i).select(`${childrenAge[i]}`);
      }
    }
  }

  /**
   * Set Travelers with provided values
   * This method does not open Travelers modal to set Adults and Children.
   *
   * @param  {number} adults - number of adults
   * @param  {number} children - optional, number of children
   * @param  {number[]} childrenAge - optional, children age
   * @param  {number} roomIndex - optional, room index (0 is the first room)
   * @return {void}
   */
  public setTravelersByValues(adults: number, children?: number, childrenAge?: number[], roomIndex: number = 0): void {
    this.setAdultsOrChildrenInTravelers(adults, true, roomIndex);
    if (children !== undefined && children >= 0) {
      this.setAdultsOrChildrenInTravelers(children, false, roomIndex);
      this.selectChildAgeInTravelers(childrenAge, roomIndex);
    }
    this.searchFormTravelersDoneButton().click();
  }

  /**
   * Verify date value in Search Form bar
   *
   * @param  {string} date - use MMMD format to provide date (for example 'Sep 14' or 'Sep 14 - Sep 15')
   * @return {void}
   */
  public verifySearchFormDateValue(date: string): void {
    this.searchFormDatesButton()
      .invoke('text')
      .then((dateText) => {
        expect(date).to.equal(dateText, `'${date}' should be equal date in Search Form '${dateText}'`);
      });
  }

  /**
   * Verify Search Form Date field is visible
   *
   * @param  {boolean} isVisible - true - date exists and is visible
   * @return {void}
   */
  public verifySearchFormDateIsVisible(isVisible: boolean): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    this.searchFormDatesButton().should(assertion);
  }

  /**
   * Verify Search button is visible
   *
   * @param  {boolean} isVisible - true - date exists and is visible
   * @return {void}
   */
  public verifySearchButtonIsVisible(isVisible: boolean): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    this.searchButton().should(assertion);
  }

  /**
   * Verify Search button is visible on each Searh Form tab
   *
   * @param  {boolean} isVisible - true - date exists and is visible
   * @return {void}
   */
  public verifySearchButtonOnEachTabIsVisible(isVisible: boolean): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    // Using a for loop is the homework requirement.
    this.searchFormAllTabsLinks()
      .its('length')
      .then((length) => {
        for (let i = 0; i < length; i++) {
          this.searchFormAllTabsLinks().eq(i).click();
          this.verifySearchButtonIsVisible(true);
        }
      });
    // There is an easier solution using .each().
    // this.searchFormAllTabsLinks().each(($el) => {
    //   cy.wrap($el).click();
    //   this.verifySearchButtonIsVisible(true);
    // })
  }
}
