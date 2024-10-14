const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m: any) => {
    const votingContract = m.contract("VotingContract");

    return { votingContract };
});
