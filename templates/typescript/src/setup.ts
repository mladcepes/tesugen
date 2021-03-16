import { TestClient } from './client';
import { testingRoutes } from './routes/testRoutes';
import { testAgent } from './testAgent';

export class TestController {
    
    testClientShould: TestClient;
    
    constructor() {
        this.testClientShould = new TestClient(testAgent, testingRoutes);
    }
}

export const ctx: TestController = new TestController();