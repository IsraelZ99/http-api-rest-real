import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const cities = [
            { id: 1, name: 'Madrid' },
            { id: 2, name: 'México' },
            { id: 3, name: 'España' },
            { id: 4, name: 'Londres' },
            { id: 5, name: 'Canada' }
        ];
        return { cities };
    }
}