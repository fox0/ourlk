import { g_db } from ".";
import { Api } from "./api";
import { IOrganization, IOrganizationDto } from "./api_types";

// abstract class Model {
//     abstract init_db(db: IDBDatabase): void;
// }

export class Organizations { // implements Model {
    static store = "organizations";

    static init_db(db: IDBDatabase) {
        console.debug("Organizations.init_db()");

        // IOrganization
        const store = db.createObjectStore(this.store, { keyPath: "id", autoIncrement: false });
    }

    static async sync(): Promise<number> {
        console.debug("Organizations.sync()");

        const count: number = await g_db.count(this.store);
        console.log("organizations: db=" + count);
        if (count !== 0) {
            return count;
        }

        const result: IOrganizationDto = await Api.get_organizations();
        if (!result.done) {
            return 0;
        }

        await g_db.insert_many(this.store, result.data);

        return result.data.length;
    }

    static async all(): Promise<IOrganization[]> {
        return await g_db.all(this.store) as IOrganization[];
    }
}
