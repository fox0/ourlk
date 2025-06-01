import { AsyncIndexedDB } from './AsyncIndexedDB';
import { Organizations } from './models';

const DB_NAME = "ourLK";

export class DB {
    db: AsyncIndexedDB;

    constructor() {
        console.debug("DB()");

        const schema = async (db: IDBDatabase) => {
            for (let i of [Organizations]) {
                i.init_db(db);
            }
        };
        this.db = new AsyncIndexedDB(DB_NAME, schema, 1);
    }
    
    async open(): Promise<void> {
        await this.db.open();
    }
}
