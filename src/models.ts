import { g_db } from ".";
import { Api } from "./api";
import { ICompetitionGroup, IEntrant, IOrganization, IOrganizationDto } from "./api_types";

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

export class Entrants {
    static store = "entrant";

    static init_db(db: IDBDatabase) {
        console.debug("Entrants.init_db()");

        // IEntrant
        const store = db.createObjectStore(this.store, { keyPath: "id", autoIncrement: false });
    }

    static async sync() {
        console.debug("Entrants.sync()");

        const count1: number = await g_db.count(this.store);
        const count2: number = (await Api.get_entrants_count()).total;
        console.log("competition_groups: db=" + count1 + " api=" + count2);
        if (count1 === count2) {
            return;
        }
        const result: IEntrant[] = await Api.get_entrants();
        await g_db.merge_many(this.store, result);
    }
}

// export class Applications

export class CompetitionGroups {
    static store = "appcg";

    static init_db(db: IDBDatabase) {
        console.debug("CompetitionGroups.init_db()");

        // ICompetitionGroups
        const store = db.createObjectStore(this.store, { keyPath: "id_cg", autoIncrement: false });
        store.createIndex("id", "id", { unique: false });
        store.createIndex("status", "status", { unique: false });
    }

    static async sync() {
        console.debug("CompetitionGroups.sync()");

        const count1: number = await g_db.count(this.store);
        const count2: number = (await Api.get_appcg_count()).total;
        console.log("competition_groups: db=" + count1 + " api=" + count2);
        if (count1 === count2) {
            return;
        }
        const result: ICompetitionGroup[] = await Api.get_appcg();
        await g_db.merge_many(this.store, result);
    }
}
