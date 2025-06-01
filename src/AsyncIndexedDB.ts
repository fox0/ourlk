// https://github.com/kennygomdori/AsyncIndexedDB
// MIT

export class AsyncIndexedDB {
    name: string;
    schema: (db: IDBDatabase) => void;
    version: number;
    db?: IDBDatabase;

    constructor(db_name: string, schema: (db: IDBDatabase) => void, version?: number) {
        this.name = db_name;
        this.schema = schema;
        this.version = version || 1;
        this.db = null;
        Object.seal(this);
    }

    open(): Promise<AsyncIndexedDB> {
        return new Promise((resolve, reject) => {
            const request = self.indexedDB.open(this.name, this.version);
            const schema = this.schema;
            request.onerror = (event) => reject(event);
            request.onsuccess = (event) => {
                this.db = request.result;
                resolve(this);
            }
            request.onupgradeneeded = function (event) {
                schema(this.result)
            };
        })
    }

    count(s: string): Promise<number> {
        const db: IDBDatabase = this.db;
        return new Promise(function(resolve, reject) {
            const transaction = db.transaction([s], "readonly");
            const store = transaction.objectStore(s);
            const request = store.count();
            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    all(s: string): Promise<object[]> {
        const db: IDBDatabase = this.db;
        return new Promise(function(resolve, reject) {
            const transaction = db.transaction([s], "readonly");
            const store = transaction.objectStore(s);
            const request = store.getAll();
            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    insert_many(s: string, rows: object[]): Promise<void> {
        const db: IDBDatabase = this.db;
        return new Promise(function(resolve, reject) {
            const transaction = db.transaction([s], "readwrite");
            // transaction.oncomplete = (event) => {
            //     console.log("Transaction completed.");
            // };
            // transaction.onerror = (event) => {
            //     console.error(event);
            // };
            const store = transaction.objectStore(s);
            rows.forEach((i) => {
                const request = store.add(i);
                // request.onsuccess = (event) => {
                    //console.log(event.target.result);
                // };
            });
        });
    }
}
