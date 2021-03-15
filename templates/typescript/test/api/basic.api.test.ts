import { ctx } from '../setup'

describe('Feature: First basic test', () => {

    describe('Scenario: User wants to perform GEt request to specific endpoint', () => {

        it('First test: Should check if the status code is 200', async () => {
            
            const response = await ctx.testClientShould.getRequestToSpecificEndpoint();
            expect(response.status).toEqual(200);
        });
    });
});