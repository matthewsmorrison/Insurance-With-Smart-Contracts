
var ECMath = artifacts.require("./ECMath.sol");
var JsmnSolLib = artifacts.require("jsmnsol-lib/JsmnSolLib.sol");
var Insurance = artifacts.require("./Insurance.sol");
var tlsnutils = artifacts.require("tlsnutils.sol");
var bytesutils = artifacts.require("bytesutils.sol");

module.exports = function(deployer) {
  deployer.deploy(JsmnSolLib);
  deployer.deploy(ECMath);
  deployer.deploy(bytesutils);
  deployer.link(ECMath,tlsnutils);
  deployer.link(bytesutils,tlsnutils);
  deployer.deploy(tlsnutils);
  deployer.link(JsmnSolLib, Insurance);
  deployer.link(tlsnutils, Insurance);
  deployer.deploy(Insurance);
};
