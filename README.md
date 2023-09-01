### Steps to set up the framework and run tests

> TLDR: run in terminal `npm install` and then `npx cypress open`

- Install [Node.js](https://nodejs.org/) (see cypress [system requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements))
- Go to the project root and run `npm install`
- After that cypress tests can be run in cypress runner `npx cypress open` or in terminal `npm run-script runTests`

### About the project

1. This is homework for implementing 5 different test cases. I used the PageObject appraoch to organize the framework's structure. Because the Web application has a fairly extensive UI structure, I've split the Search Form block into a main SearchForm class and additional search tabs that represents parts of the Search form (for example StaysTab class).
2. Since the tests are run in the Prod environment, some additional fixes/improvements may be required to run the tests in test environments.
