import supertest, { SuperAgentTest } from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

export let testAgent: SuperAgentTest = supertest.agent(
    String(process.env.BASE_URL)
);