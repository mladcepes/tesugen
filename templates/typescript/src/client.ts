import { Response, SuperAgentTest } from 'supertest';
import { testRoutes, TestRoutes } from './routes/testRoutes';
import { testAgent } from './testAgent';

export class TestClient {

    constructor(
        readonly http: SuperAgentTest, 
        readonly routes: TestRoutes
        ) {}

    public async getRequestToSpecificEndpoint(): Promise<Response> {
        const response = await this.http.get(this.routes.getRoute);
        return response;
    }

    public async postRequestToSpecificEndpoint(route: string, body: {}): Promise<Response> {
        const response = await this.http.post(route).send(body);
        return response;
    }

    public async putRequestToSpecificEndpoint(body: {}): Promise<Response> {
        const response = await this.http.put(this.routes.putRoute).send(body);
        return response;
    }

    public async deleteRequestToSpecificEndpoint(): Promise<Response> {
        const response = await this.http.delete(this.routes.deleteRoute);
        return response;
    }
}

export const testClientShould = new TestClient(testAgent, testRoutes);