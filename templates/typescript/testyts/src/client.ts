import supertest, { Response, SuperAgentTest } from "supertest";
import { TestRoutes } from "./routes/testRoutes";
import dotenv from "dotenv";
dotenv.config();

export class TestClient {
  constructor(
    private http: SuperAgentTest = supertest.agent(process.env.BASE_URL), 
    private routes: TestRoutes = new TestRoutes()
    ) {}

  public async getRequestToSpecificEndpoint(): Promise<Response> {
    const response = await this.http.get(this.routes.getRoute);
    return response;
  }

  public async postRequestToSpecificEndpoint(body: {}): Promise<Response> {
    const response = await this.http.post(this.routes.postRoute).send(body);
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