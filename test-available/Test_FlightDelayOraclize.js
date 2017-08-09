/**
 * Unit tests for FlightDelayNewPolicy
 *
 * @author Christoph Mussenbrock
 * @description t.b.d
 * @copyright (c) 2017 etherisc GmbH
 *
 */
const FlightDelayUnderwrite = artifacts.require('FlightDelayUnderwrite');
const logformatter = require('./logformatter.js');

contract('FlightDelayUnderwrite', (accounts) => {
  it('should schedule Oraclize Call', async () => {
    const FD_UW = await FlightDelayUnderwrite.deployed();
    const lf = new logformatter(FD_UW, web3);

    var policyId = 0;
    var carrierFlightNumber = 'LH/410';

    return FD_UW.scheduleUnderwriteOraclizeCall(policyId, carrierFlightNumber, {
      gas: 4700000,
    });

  }); // it

}); // contract
