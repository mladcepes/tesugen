export class TestRoutes {
    
    constructor(
        public readonly getRoute: string = '',
        public readonly postRoute: string = '',
        public readonly putRoute: string = '',
        public readonly deleteRoute: string = ''
    ) {}
}

export const testingRoutes = new TestRoutes();