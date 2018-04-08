'use strict';

const config = require('config');
const express = require('express');
const log4js = require('log4js');
const wol = require('wakeonlan');

log4js.configure(config.get('log4js'));

const logger = log4js.getLogger('gh-proxy');
const router = express.Router();

router.get('/', (req, res) => {
    const token = req.query.token;
    const macAddr = req.query.mac_addr;

    if (!token || !macAddr || token !== config.get('wol.token')) {
        logger.warn(`Invalid parameters: token = ${token}, mac_addr = ${macAddr}`);
        res.sendStatus(400);
    } else {
        wol(macAddr).then(() => {
            logger.info(`Accept a request of WoL (mac_addr = ${macAddr}).`);
            res.sendStatus(200);
        }).catch((err) => {
            logger.error(`Accept a request of WoL (mac_addr = ${macAddr}) but an error occurred: ${err}`);
            res.sendStatus(500);
        });
    }
});

module.exports = router;
