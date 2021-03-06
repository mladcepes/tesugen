import { ctx } from '../../src/setup'

describe('Feature: First basic test', () => {

    describe('Scenario: User wants to perform GET request to specific endpoint', () => {

        it('First test: Should check if the status code is 200', async () => {
            
            const response = await ctx.testClientShould.getRequestToSpecificEndpoint();
            expect(response.status).toEqual(200);
        });
    });
});