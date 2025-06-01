import { Api } from './api';
import { IUserDto } from './api_types';
import { AsyncIndexedDB } from './AsyncIndexedDB';
import { Organizations } from './models';
import { UI } from './ui';

const DB_NAME = "ourLK";

export let g_db: AsyncIndexedDB;

async function init() {
    console.log("init()");

    UI.clear();

    const schema = (db: IDBDatabase) => {
        for (let i of [Organizations]) {
            i.init_db(db);
        }
    };
    g_db = new AsyncIndexedDB(DB_NAME, schema, 1);
    await g_db.open();

    // TODO timer 60 sec / localstorage / 13 min await

    let user: IUserDto = await Api.get_user();
    if (!user.done) {
        console.log("is_login = false");
        UI.page9999();
    } else {
        console.log("is_login = true");
        UI.page1();
    }
}

init();
