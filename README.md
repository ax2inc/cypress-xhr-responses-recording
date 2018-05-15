# Dynamic XHR responses recording & stubbing with Cypress

This is as simple project that showcases a way of dynamically saving XHR responses as JSON fixtures while running tests and using these fixtures to stub requests in subsequent tests.

This was created as a supplement to a Medium article that you can read here: [https://medium.com/ax2-inc/dynamic-xhr-responses-recording-stubbing-with-cypress-9257d4f730cd](https://medium.com/ax2-inc/dynamic-xhr-responses-recording-stubbing-with-cypress-9257d4f730cd)

To try this out, clone the project and install its dependencies:

```sh
yarn
```

Then, run the tests in record mode to save XHR responses locally:

```sh
yarn e2e:record
```

You can now run following tests in normal mode which will use the JSON fixture to stub XHR requests:

```sh
yarn e2e
```