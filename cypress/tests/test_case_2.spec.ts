import { FlightsTab } from '../pages/searchForm/flightsTab';
import { FlightTypes } from '../pages/baseEnums';

const flightsTab = new FlightsTab();

describe('Test Case 2', () => {
  it('Verify default dates on Flights tab', () => {
    const currentDate = flightsTab.getCurrentDateInMmmdFormat();
    flightsTab.visitHomepage();
    flightsTab.goToFlightsTab();
    flightsTab.setFlightType(FlightTypes.ONE_WAY);
    // The check below fails because the current date never matches the expedia.com date.
    // This check is here because it's the homework requirement.
    flightsTab.verifySearchFormDateValue(currentDate);
    flightsTab.setFlightType(FlightTypes.ROUND_TRIP);
    flightsTab.verifyFlightsDateIsVisible(true);
  });
});
