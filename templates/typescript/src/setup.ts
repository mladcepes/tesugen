import { TestClient } from './client';
import { testingRoutes } from './routes/testRoutes';
import { testAgent } from './testAgent';

export class TestController {
    constructor(
        public readonly testClientShould: TestClient = new TestClient(testAgent, testingRoutes)
    ) {}
}

export const ctx: TestController = new TestController();