'use strict';

const config = require('config');
const express = require('express');
const log4js = require('log4js');

const PORT = process.env.PORT || 3000;

log4js.configure(config.get('log4js'));

const app = express();
const logger = log4js.getLogger('gh-proxy');

app.use('/wol', require('./routes/wol'));

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`gh-proxy listening on port ${PORT}.`);
    });
}

module.exports = app;
