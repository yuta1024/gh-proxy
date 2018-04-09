/* eslint global-require: off */

'use strict';

const assert = require('chai').assert;
const mockery = require('mockery');
const sinon = require('sinon');
const supertest = require('supertest');

describe('GET /wol', () => {
    const wolStub = sinon.stub();

    beforeEach(() => {
        wolStub.reset();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
        mockery.registerMock('wakeonlan', wolStub);
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('returns 400 if token is undefined', (done) => {
        supertest(require('../../index'))
            .get('/wol')
            .query({})
            .expect(400, done);
    });

    it('returns 400 if macAddr is undefined', (done) => {
        supertest(require('../../index'))
            .get('/wol')
            .query({ token: 'valid_token' })
            .expect(400, done);
    });

    it('returns 400 if token is invalid', (done) => {
        supertest(require('../../index'))
            .get('/wol')
            .query({
                token: 'invalid_token',
                mac_addr: '00:00:00:00:00:00'
            })
            .expect(400, done);
    });

    it('returns 200 if token is valid', (done) => {
        wolStub.resolves();

        supertest(require('../../index'))
            .get('/wol')
            .query({
                token: 'valid_token',
                mac_addr: '01:23:45:67:89:AB'
            })
            .expect(200, () => {
                assert.isTrue(wolStub.calledOnce);
                assert.strictEqual(wolStub.getCall(0).args[0], '01:23:45:67:89:AB');
                done();
            });
    });

    it('returns 500 if an error occurred in WoL sending', (done) => {
        wolStub.rejects();

        supertest(require('../../index'))
            .get('/wol')
            .query({
                token: 'valid_token',
                mac_addr: '01:23:45:67:89:AB'
            })
            .expect(500, () => {
                assert.isTrue(wolStub.calledOnce);
                assert.strictEqual(wolStub.getCall(0).args[0], '01:23:45:67:89:AB');
                done();
            });
    });
});
