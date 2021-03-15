# **Tesugen**
## Version 1.0.0
### Extendable basic API tests setup generator - Setup  your API-testing framework easily!

Use tesugen to generate basic extendable API test framework in [Typescript](https://www.typescriptlang.org/) whenever you need it!

Install tesugen globally on your machine: ```npm install tesugen -g```

Locate to desired directory and run: ```tesugen-generate``` to generate and setup your API test framework.
You will be asked to choose your package manager, name your directory and you will be ready to go!

**Setup:**

* Typescript preprocessor for Jest: [TS-Jest](https://www.npmjs.com/package/ts-jest)
* Test runner: [Jest](https://jestjs.io/)
* Test reporter: [Jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters)
* HTTP Client: [Supertest Agent](https://www.npmjs.com/package/supertest)
* Class-validator: [Class-validator](https://www.npmjs.com/package/class-validator) - For aditional contract/integration testing!
* Working with dotenv files: [Dotenv](https://www.npmjs.com/package/dotenv)

Idea is to have quick way to generate basic setup for API-testing framework. For initial version, the setup is listed. This is highlt configurable, you can adjust it to your project needs, weither you prefer other test runner, reporter or http client! 

**Class validator**: Function located in ./validation/responseValidation can be used for extended contract/integration testing. Make sure to create proper models according to desired response from your project documentation. To speed this process up, use any JSON to TS generator online to quickly convert JSON to TS interfaces/classes. Follow [Class-validator](https://www.npmjs.com/package/class-validator) documentation. Your tests will look like this: 
```
expect(validateResponse(basicResponse).toBeTruthy();
```

**BASE_URL** is stored in your local .env file. This is also highly conigurable, you can adjust this to your project needs. Test credentials can also be stored in local .env file and be used for authorized endpoints. [Supertest Agent](https://www.npmjs.com/package/supertest) supports setting header: 
```
supertest.agent(String(process.env.BASE_URL)).set({'Authorization':`${bearerToken}`}); 
```