// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/utils/math/SafeMath.sol";

contract Deemos {

    using SafeMath for uint256;

    struct Token {
        string name;
        string description;
        string tokenURI;
        string symbol;
        uint256 endValidityTime;
        bool isValid;
        uint256 id;
        address owner;
    }

    struct Owner {
        uint256 tokensNbr;
        uint256[] tokensId;
        mapping(uint256 => bool) tokens;
    }

    address private owner;

    mapping(address => Owner) private owners;
    mapping(uint256 => Token) private tokens;

    uint256 private tokenIdCounter;

    modifier ownerOnly {
        require (msg.sender == owner || tx.origin == owner, "You're not authorized to perform this action!");
        _;
    }

    constructor() public {
        owner = tx.origin;
        tokenIdCounter = 0;
    }

    /// @notice Count all tokens assigned to an owner
    /// @param _owner Address for whom to query the balance
    /// @return Number of tokens owned by `owner`
    function balanceOf(address _owner) external view returns (uint256) {
        return owners[_owner].tokensNbr;
    }

    /// @notice Get owner of a token
    /// @param _tokenId Identifier of the token
    /// @return Address of the owner of `tokenId`
    function ownerOf(uint256 _tokenId) external view returns (address) {
        return tokens[_tokenId].owner;
    }

    /// @notice Check if a token hasn't been revoked
    /// @param _tokenId Identifier of the token
    /// @return True if the token is valid, false otherwise
    function isValid(uint256 _tokenId) external view returns (bool) {
        return (tokens[_tokenId].isValid && tokens[_tokenId].endValidityTime > block.timestamp);
    }

    /// @notice Check if an address owns a valid token in the contract
    /// @param _owner Address for whom to check the ownership
    /// @param _tokenId Identifier of the token
    /// @return True if `owner` has a valid token, false otherwise
    function hasValid(address _owner, uint256 _tokenId) external view returns (bool) {
        return owners[_owner].tokens[_tokenId];
    }

    function getAllTokens(address _owner) external view returns (uint[] memory) {
        return owners[_owner].tokensId;
    }

    /// @notice Get the info of a token
    /// @param _tokenId Indentifier of the token
    /// @return The info of the token
    function getTokenInfos(uint256 _tokenId) external view returns (string memory, string memory, string memory, string memory, uint256, bool, uint256, address) {
        Token memory tempToken = tokens[_tokenId];
        return (tempToken.name, tempToken.description, tempToken.symbol, tempToken.tokenURI, tempToken.endValidityTime, tempToken.isValid, tempToken.id, tempToken.owner);
    }

    /// @notice Create a token with the given informations to the given owner
    /// @param _owner Address for whom to have the token
    /// @param _name Name of the token
    /// @param _description Description of the token
    /// @param _tokenURI URI of the token
    /// @param _symbol Symbol of the token
    /// @return Return the id of the created token
    function createToken(address _owner, string memory _name, string memory _description, string memory _tokenURI, string memory _symbol, uint256 _endValidityTime) external returns (uint256) {
        owners[_owner].tokens[tokenIdCounter] = true;
        owners[_owner].tokensNbr = owners[_owner].tokensNbr.add(1);
        owners[_owner].tokensId.push(tokenIdCounter);

        tokens[tokenIdCounter].name = _name;
        tokens[tokenIdCounter].description = _description;
        tokens[tokenIdCounter].tokenURI = _tokenURI;
        tokens[tokenIdCounter].symbol = _symbol;
        tokens[tokenIdCounter].endValidityTime = _endValidityTime;
        tokens[tokenIdCounter].isValid = true;
        tokens[tokenIdCounter].id = tokenIdCounter;
        tokens[tokenIdCounter].owner = _owner;
        tokenIdCounter = tokenIdCounter.add(1);
        return tokenIdCounter.sub(1);
    }

    /// @notice Unvalid a token
    /// @param _tokenId Identifier of the token
    function unvalidToken(uint256 _tokenId) external ownerOnly returns (bool) {
        if (_tokenId > tokenIdCounter || tokens[_tokenId].isValid == false)
            return false;
        tokens[_tokenId].isValid = false;
        return true;
    }

}
