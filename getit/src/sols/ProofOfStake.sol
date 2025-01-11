// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RentableERC1155WithStaking is ERC1155, Ownable {
    uint256 public constant MINIMUM_STAKE = 0.1 ether; // Minimum stake required

    struct UserInfo {
        uint256 stakedAmount;
        bool isActive; // Whether the username is active
    }

    mapping(address => UserInfo) public users;

 constructor(string memory uri, address initialOwner) ERC1155(uri/add metadata in json/) Ownable(initialOwner) {}

    function StakeAmount() public payable   {
        require(msg.value >= MINIMUM_STAKE, "Insufficeient stake amount ");
          require(!users[msg.sender].isActive, "User already registered");

          users[msg.sender].stakedAmount = msg.value;
          users[msg.sender].isActive = true;

    }

    function deactivate() public {
        require(users[msg.sender].isActive,"User not Active");
        users[msg.sender].isActive = false;
    }

        function withdrawEth ()public payable {
            require(users[msg.sender].stakedAmount > 0, "you must Stake some bruh!");
            uint256  amount = users[msg.sender].stakedAmount;
               require(amount > 0, "no stake to washout!");

               users[msg.sender].stakedAmount = 0;
               payable(msg.sender).transfer(amount);
        }

        function checkWhetherIsRegistered (address _user) public view returns (bool) {
            return users[_user].isActive; 
        }

        receive() external payable { }
}