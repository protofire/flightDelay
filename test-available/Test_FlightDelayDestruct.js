/**
 * Unit tests for FlightDelayNewPolicy
 *
 * @author Christoph Mussenbrock
 * @description t.b.d
 * @copyright (c) 2017 etherisc GmbH
 *
 */

const log = require('../util/logger');

const FlightDelayAccessController = artifacts.require('FlightDelayAccessController');
const FlightDelayController = artifacts.require('FlightDelayController');
const FlightDelayDatabase = artifacts.require('FlightDelayDatabase');
const FlightDelayLedger = artifacts.require('FlightDelayLedger');
const FlightDelayNewPolicy = artifacts.require('FlightDelayNewPolicy');
const FlightDelayUnderwrite = artifacts.require('FlightDelayUnderwrite');
const FlightDelayPayout = artifacts.require('FlightDelayPayout');


contract('FlightDelayNewPolicy', (accounts) => {
    it('should destroy all contracts and refund to owner', async () => {
        const instances = {};
        let grandTotal = 0;

        instances.CT = await FlightDelayController.deployed();
        instances.AC = await FlightDelayAccessController.deployed();
        instances.DB = await FlightDelayDatabase.deployed();
        instances.LG = await FlightDelayLedger.deployed();
        instances.NP = await FlightDelayNewPolicy.deployed();
        instances.UW = await FlightDelayUnderwrite.deployed();
        instances.PY = await FlightDelayPayout.deployed();

        const accountBalance = web3.fromWei(await web3.eth.getBalance(accounts[0]), 'ether').toFixed(2);
        grandTotal += Number(accountBalance);
        log(grandTotal);
        log('Acc Balance before: ', accountBalance);

        const CTBalance = web3.fromWei(await web3.eth.getBalance(instances.CT.address), 'ether').toFixed(2);
        grandTotal += Number(CTBalance);
        log('CT Balance: ', CTBalance);

        const LGBalance = web3.fromWei(await web3.eth.getBalance(instances.LG.address), 'ether').toFixed(2);
        grandTotal += Number(LGBalance);
        log('LG Balance: ', LGBalance);

        const UWBalance = web3.fromWei(await web3.eth.getBalance(instances.UW.address), 'ether').toFixed(2);
        grandTotal += Number(UWBalance);
        log('UW Balance: ', UWBalance);

        const PYBalance = web3.fromWei(await web3.eth.getBalance(instances.PY.address), 'ether').toFixed(2);
        grandTotal += Number(PYBalance);
        log('PY Balance: ', PYBalance);

        await instances.CT.destructAll({
            from: accounts[0],
            gas: 4700000,
        });

        const newBalance = web3.fromWei(await web3.eth.getBalance(accounts[0]), 'ether').toFixed(2);
        grandTotal -= newBalance;
        log('Acc. Balance after: ', newBalance);
        log('Diff              : ', grandTotal.toFixed(2));

        assert(grandTotal < 0.1, 'Diff should be less than 0.01 ETH');
    });
});
