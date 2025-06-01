import { Api } from './api';
import { DB } from './db';
import { UI } from './ui';

const g_db = new DB();

async function init() {
    console.log("init()");

    // UI.clear();

    await g_db.open();
        let is_login = await Api.is_login();
        if (!is_login) {
            console.log("is_login = false");
            // UI.page9999();
        } else {
            console.log("is_login = true");
            // UI.page1();
        }
}

init();
