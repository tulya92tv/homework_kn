import { StaysTab } from '../pages/searchForm/staysTab';
// @ts-ignore
import * as dayjs from 'dayjs';

const staysTab = new StaysTab();
let searchResultUrl: string;

describe('Test Case 4 and 5', () => {
  it('Search Stays with destination and dates', () => {
    const startDate = dayjs().add(1, 'week').format('YYYY-MM-DD');
    const endDate = dayjs(startDate).add(1, 'week').format('YYYY-MM-DD');

    staysTab.visitHomepage();
    staysTab.selectStaysDestinationByIndex('Universal Orlando Resort', 0);
    staysTab.setSearchFormDates(startDate, endDate);
    staysTab.searchStays();
    staysTab.getCurrentURL().then((url) => {
      searchResultUrl = url;
    });
  });

  it('Set Travelers and verify updated results', () => {
    staysTab.visitStaysSearchResultsPage(searchResultUrl);
    staysTab.setTravelersByValues(2, 2, [8, 10]);
    staysTab.verifyStaysSearchResultsAreVisible(true, 3);
  });
});
