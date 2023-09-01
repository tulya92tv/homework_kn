/**
 * Class representing Flights tab on Search Form.
 *
 * @export FlightsTab
 * @class FlightsTab
 */

import { SearchForm } from './searchForm';
import { FlightTypes, SearchFormLabels, CabinClasses } from '../baseEnums';

export class FlightsTab extends SearchForm {
  private flightTypeLink(type: FlightTypes) {
    return cy.get(`a[aria-controls="FlightSearchForm_${type.toString()}"]`);
  }
  private searchFormLabel(label: SearchFormLabels) {
    return cy.get('div[class^="uitk-field has-floatedLabel-label has-icon"]').find('label[class^="uitk-field-label"]').contains(label.toString());
  }
  private cabinClassDropdownButton() {
    return cy.get('#cabin_class');
  }
  private cabinClassOptionsButton(cabinClass: CabinClasses) {
    return cy.get('div[role="menu"]').find('button').contains(cabinClass.toString());
  }
  private flightSearchForm() {
    return cy.get('form[id="flight_search_form"]');
  }
  private searchFormFlightsDateButton() {
    return cy.get('form[id="flight_search_form"]').find('button[data-stid="open-date-picker"]');
  }

  /**
   * Set flight type
   *
   * @param  {FlightTypes} flightType - use FlightTypes enum
   * @return {void}
   */
  public setFlightType(flightType: FlightTypes): void {
    this.flightTypeLink(flightType).click();
  }

  /**
   * Select cabin class
   *
   * @param  {CabinClasses} cabinClass - use CabinClasses enum
   * @return {void}
   */
  public selectCabiClass(cabinClass: CabinClasses): void {
    this.cabinClassDropdownButton().click();
    this.cabinClassOptionsButton(cabinClass).click();
  }

  /**
   * Verify flight type selected
   *
   * @param  {FlightTypes} flightType - use FlightTypes enum
   * @param  {boolean} selected - true - flight type is selected
   * @return {void}
   */
  public verifyFlightTypeIsSelected(flightType: FlightTypes, selected: boolean): void {
    this.flightTypeLink(flightType)
      .invoke('prop', 'ariaSelected')
      .then((ariaSelected) => {
        expect(ariaSelected).to.equal(selected.toString(), `${flightType} flight type should be selected`);
      });
  }

  /**
   * Verify flight label is visible
   *
   * @param  {SearchFormLabels} label - use SearchFormLabels enum
   * @param  {boolean} isVisible - true - label exists and is visible
   * @return {void}
   */
  public verifyFlightLabelIsVisible(label: SearchFormLabels, isVisible: boolean): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    this.searchFormLabel(label).should(assertion);
  }

  /**
   * Verify default flight labels are visible
   *
   * @param  {boolean} isVisible - true - label exists and is visible
   * @return {void}
   */
  public verifyDefaultFlightLabelsAreVisible(isVisible: boolean): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    this.searchFormLabel(SearchFormLabels.LEAVING_FROM).should(assertion);
    this.searchFormLabel(SearchFormLabels.GOING_TO).should(assertion);
    this.searchFormLabel(SearchFormLabels.DATES).should(assertion);
    this.searchFormLabel(SearchFormLabels.TRAVELERS).should(assertion);
  }

  /**
   * Verify cabin class value
   *
   * @param  {CabinClasses} cabinClass - use CabinClasses enum
   * @return {void}
   */
  public verifyCabinClassValue(cabinClass: CabinClasses): void {
    this.cabinClassDropdownButton().invoke('attr', 'aria-expanded').should('eq', 'false');
    this.cabinClassDropdownButton()
      .invoke('text')
      .then((cabin) => {
        expect(cabinClass.toString()).be.equal(cabin, `${cabinClass} cabin class should be equal ${cabin}`);
      });
  }

  /**
   * Verify Flights Date field is visible
   *
   * @param  {boolean} isVisible - true - date exists and is visible
   * @return {void}
   */
  public verifyFlightsDateIsVisible(isVisible: boolean): void {
    const assertion = isVisible ? 'be.visible' : 'not.be.visible';
    this.flightSearchForm().should('have.length', 1).and(assertion);
    this.searchFormFlightsDateButton().should(assertion);
  }
}
