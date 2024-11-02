// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./GovernanceToken.sol";

contract CreateGovernanceToken {
    mapping(uint256 => address[]) public userIdToDeployedTokens;

    function deployToken(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _totalSupply,
        uint256 _userId
    ) public {
        address tokenAddress = address(new GovernanceToken(_tokenName, _tokenSymbol, _totalSupply));
        userIdToDeployedTokens[_userId].push(tokenAddress);

        GovernanceToken(tokenAddress).transfer(msg.sender, _totalSupply * 10 ** 18);
    }

    function getBalance(
        address _tokenAddress,
        address _userAddress
    ) public view returns (uint256) {
        return GovernanceToken(_tokenAddress).balanceOf(_userAddress);
    }

    function getTotalTokensDeployed(
        uint256 _userId
    ) public view returns (uint256) {
        return userIdToDeployedTokens[_userId].length;
    }
}
