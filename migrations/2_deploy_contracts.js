var ECMath = artifacts.require("./ECMath.sol");
var JsmnSolLib = artifacts.require("jsmnsol-lib/JsmnSolLib.sol");
var tlsnutils = artifacts.require("tlsnutils.sol");
var bytesutils = artifacts.require("bytesutils.sol");

var Insurance = artifacts.require("./Insurance.sol");

// var contract = require("truffle-contract");
// var MyContract = contract(Insurance)

module.exports = function(deployer, network) {
  if(network == "rinkeby"){
    // console.log(deployer);
    // var jsonlib = JsmnSolLib.at("0x3fa0cbafd1ac0d2250a3920e96ce023a9d913657");
    // console.log(jsonlib);
    // var tlslib = tlsnutils.deployed();
    //at("0xe7013219a17f098f75d532bc8d6f0569286c9968");
    // Insurance.link(jsonlib);
    // Insurance.link(tlslib);
    // deployer.deploy(Insurance);
    deployer.deploy(JsmnSolLib, {overwrite: false});
    deployer.deploy(ECMath, {overwrite: false});
    deployer.deploy(bytesutils, {overwrite: false});
    deployer.link(ECMath,tlsnutils);
    deployer.link(bytesutils,tlsnutils);
    deployer.deploy(tlsnutils, {overwrite: false});
    deployer.link(tlsnutils, Insurance);
    deployer.link(JsmnSolLib, Insurance);
    deployer.deploy(Insurance);
  }
};
