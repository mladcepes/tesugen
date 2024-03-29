# **Tesugen**
## Version 1.1.3
### Setup your API-testing framework easily.

Use tesugen to setup API-testing framework in [Typescript](https://www.typescriptlang.org/) whenever you need it.

Make sure that you are running latest stable [NodeJS](https://nodejs.org/en/) (>= 14.6.0 LTS) and [npm](https://docs.npmjs.com/cli/v7/configuring-npm/install) (>=7.6.1) version.
## Table of Contents  
- [Installation & Usage](#installation-&-usage)
- [Project setup: Jest](#project-setup-jest)
- [Project setup: TestyTS](#project-setup-testyts)  
- [Structure: Jest](#structure-jest) 
- [Structure: TestyTS](#structure-testyts) 
- [Test client](#test-client)
- [Class validator](#class-validator)
- [Base URL](#base-URL)
- [Dotenv file example](#dotenv-file-example)

## Installation & Usage
---
Navigate to desired directory and run:

```npx tesugen```

You will be asked to choose your package manager, test runner, name your project and you will be ready to go.

## Project-setup: [Jest](https://jestjs.io/) as selected test runner
---
* Typescript preprocessor for Jest (If selected runner is Jest): [TS-Jest](https://www.npmjs.com/package/ts-jest)
* Test runner: [Jest](https://jestjs.io/)
* Test reporter for Jest: [Jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters)
* HTTP Client: [Supertest Agent](https://www.npmjs.com/package/supertest)
* Class-validator: [Class-validator](https://www.npmjs.com/package/class-validator) - For aditional contract/integration testing.
* Working with dotenv files: [Dotenv](https://www.npmjs.com/package/dotenv)

## Project-setup: [TestyTS](https://testy.github.io/) as selected test runner
---
* Test runner: [TestyTS](https://testy.github.io/)
* HTTP Client: [Supertest Agent](https://www.npmjs.com/package/supertest)
* Class-validator: [Class-validator](https://www.npmjs.com/package/class-validator) - For aditional contract/integration testing.
* Working with dotenv files: [Dotenv](https://www.npmjs.com/package/dotenv)

## Structure: Jest
---
- src
    - routes
        - testRoutes.ts - Initial routes setup (Endpoints which will be the target)
    - client.ts - Initial test client setup
    - setup.ts - Initial test controller setup
    - testAgent.ts - Superagent initial setup
- test - test folder where you can organize your tests
- validation - validateResponse function for aditional contract/integration testing
- .env - local environment file
- .gitignore
- index.ts
- jest.config.js - Initial Jest config file (Generated only if the selected runner is Jest)

---
Create desired npm scripts to run specific tests: 
```
"scripts": {
    "test": "jest ./test/functional/example",
    "test:basic": "jest ./test/basic/example"
  },
```
If you run ```jest``` in project root, Jest will by default look for all files with *.test.ts and run them if possible.
To have everything running smoothly, testEnvironment and preset in jest.config.jest should be set by default:

````
preset: 'ts-jest',
testEnvironment: 'node',
````
---

Test reports will be generated in ./html-report in HTML format via [Jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters). Reporter can be configured in jest.config.js file. Jest supports multiple [reporters](https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options). You can even create own custom reporter.

## Structure: TestyTS
---
- src
    - routes
        - testRoutes.ts - Initial routes setup (Endpoints which will be the target)
    - client.ts - Initial test client setup
- test - test folder where you can organize your tests
- validation - validateResponse function for aditional contract/integration testing
- .env - local environment file
- .gitignore

---
Create desired npm scripts to run specific tests: 
```
"scripts": {
    "test": "testyts",
    "test:basic": "testyts ./test/basic/example"
  },
```
## Test client
---
Test client can be configured and reused with no limitations. For testing multiple services, feel free to configure TestController to have multiple TestClient properties for every desired service.

Test client has four basic example methods for four HTTP methods: GET, POST, PUT and DELETE. 
## Class validator
---
Function located in ./validation/responseValidation.ts can be used for extended contract/integration testing. Make sure to create proper models according to desired response from your project documentation. To speed this process up, use any JSON to TS generator online to quickly convert JSON to TS interfaces/classes. Example: [json2ts](http://json2ts.com/). Follow [Class-validator](https://www.npmjs.com/package/class-validator) documentation. Your tests will look like this: 
```
expect(validateResponse(ProfileExampleResponse).toBeTruthy();
```

## Base URL
---
is stored in your local .env file. This is also highly conigurable, you can adjust this to your project needs. Test credentials can also be stored in local .env file and be used for authorized endpoints. [Supertest Agent](https://www.npmjs.com/package/supertest) supports setting headers: 
```
supertest.agent(String(process.env.BASE_URL)).set({'Authorization':`${bearerToken}`}); 
```

## Dotenv file example
---
```
BASE_URL=https://www.aaa.ccc
```

## License
---
- [MIT](LICENSE)
