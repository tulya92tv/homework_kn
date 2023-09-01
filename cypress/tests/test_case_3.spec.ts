import { SearchForm } from '../pages/searchForm/searchForm';

const searchForm = new SearchForm();

describe('Test Case 3', () => {
  it('Verify Search button is visible on every tab', () => {
    searchForm.visitHomepage();
    searchForm.verifySearchButtonOnEachTabIsVisible(true);
  });
});
