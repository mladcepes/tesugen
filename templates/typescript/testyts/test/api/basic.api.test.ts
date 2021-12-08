import { TestSuite, Test, expect } from "testyts/build/testyCore";
import { TestClient } from "../../src/client";

@TestSuite()
export class ApiTestSuite extends TestClient {
  @Test("Should GET specific endpoint")
  async checkIfStatusCodeIs200() {
    const response = await this.getRequestToSpecificEndpoint();
    expect.toBeEqual(response.status, 200);
  }
}
