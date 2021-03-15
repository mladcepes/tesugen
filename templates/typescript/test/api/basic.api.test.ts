import { ctx } from '../setup'

describe('Feature: First basic test', () => {

    describe('Scenario: I want to get my test endpoint', () => {

        it('First test: Should check if status code is 200', async () => {
            
            const response = await ctx.testClientShould.getRequestToSpecificEndpoint();
            expect(response.status).toEqual(200);
        });
    });
});