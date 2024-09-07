//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Vault.sol";

contract PoolFactory {
  Vault[] public insurancePools;

  event PoolCreated(address owner, address pool);

  function createNewPool(ERC20 _asset, string memory _name, string memory _symbol) public returns(Vault) {
    Vault pool = new Vault(_asset, _name, _symbol);
    insurancePools.push(pool);
    pool.transferOwnership(msg.sender);
    emit PoolCreated(msg.sender, address(pool));
    return pool;
  }

  function getAllPools() public view returns(Vault[] memory) {
    return insurancePools;
  }
}