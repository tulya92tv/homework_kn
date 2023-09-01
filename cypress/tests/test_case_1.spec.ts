import { FlightsTab } from '../pages/searchForm/flightsTab';
import { FlightTypes, CabinClasses } from '../pages/baseEnums';

const flightsTab = new FlightsTab();

describe('Test Case 1', () => {
  it('Verify defaults on Flights tab', () => {
    flightsTab.visitHomepage();
    flightsTab.goToFlightsTab();
    flightsTab.verifyFlightTypeIsSelected(FlightTypes.ROUND_TRIP, true);
    flightsTab.verifyDefaultFlightLabelsAreVisible(true);
    flightsTab.selectCabiClass(CabinClasses.FIRST_CLASS);
    flightsTab.verifyCabinClassValue(CabinClasses.FIRST_CLASS);
  });
});
