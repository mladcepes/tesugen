import { TestClient } from '../src/client';
import { testRoutes } from '../src/routes/testRoutes';
import { testAgent } from '../src/testAgent';

export class TestController {
    constructor(
        public readonly testClientShould: TestClient = new TestClient(testAgent, testRoutes)
    ) {}
}

export const ctx: TestController = new TestController();