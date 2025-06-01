export class Organizations {
    static db_name = "organizations";

    static init_db(db: IDBDatabase) {
        console.debug("Organizations.init_db()");

        const store: IDBObjectStore = db.createObjectStore(this.db_name, { keyPath: "id", autoIncrement: false });
    }

    // static async sync() {
    //     console.debug("Organizations.sync()");
    //     const count = await DB.get_organizations_count();
    //     console.log("organizations: db=" + count);
    //     if (count !== 0) {
    //         return;
    //     }

    //     const result = await Api.get_organizations();

    //     const transaction = g_db.transaction([DB_ORGANIZATIONS], "readwrite");
    //     transaction.oncomplete = (event) => {
    //         console.log("Transaction completed.");
    //     };
    //     transaction.onerror = (event) => {
    //         console.error(event);
    //     };
    //     const store = transaction.objectStore(DB_ORGANIZATIONS);
    //     result.forEach((i) => {
    //         const request = store.add(i);
    //         request.onsuccess = (event) => {
    //             //console.log(event.target.result);
    //         };
    //     });
    // }
}
