// * max-len isn't needed here
// * This script is very dependant on the project files
/* eslint-disable max-len */

import logger from '../src/utils/logger.util';

import { appDataSource } from '../src/database/datasource';
import { AuthService } from '../src/services/auth.service';

// -------------------------------------------------------------------- //

const DEFAULT_PHONE_FORMAT = '+62 ### #### ####';
const AUTH_SERVICE = new AuthService();

async function insertData() {
    const { hashPassword } = AUTH_SERVICE;
}

// -------------------------------------------------------------------- //

appDataSource
    .initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));
