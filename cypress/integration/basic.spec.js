describe('MyApp', () => {
  // We declare an empty array to gather XHR responses
  const xhrData = [];

  after(() => {
    // In record mode, save gathered XHR data to local JSON file
    if (Cypress.env('RECORD')) {
      const path = './cypress/fixtures/fixture.json';
      cy.writeFile(path, xhrData);
      cy.log(`Wrote ${xhrData.length} XHR responses to local file ${path}`);
    }
  });

  it('Works', () => {

    cy.server({
      // Here we handle all requests passing through Cypress' server
      onResponse: (response) => {
        if (Cypress.env('RECORD')) {
          const url = response.url;
          const method = response.method;
          const data = response.response.body;
          // We push a new entry into the xhrData array
          xhrData.push({ url, method, data });
        }
      },
    });

    // This tells Cypress to hook into any GET request
    if (Cypress.env('RECORD')) {
      cy.route({
        method: 'GET',
        url: '*',
      });
    }

    // Load stubbed data from local JSON file
    if (!Cypress.env('RECORD')) {
      cy.fixture('fixture')
        .then((data) => {
          for (let i = 0, length = data.length; i < length; i++) {
            cy.route(data[i].method, data[i].url, data[i].data);
          }
        });
    }

    cy.visit('http://localhost:8080/');
    cy.get('ul').find('li').should('have.length', 10);

  });
});
