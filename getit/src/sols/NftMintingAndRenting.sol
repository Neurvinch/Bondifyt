//// import "../interfaces/IERC4907.sol";

 /*contract NftMintingAndRenting is ERC721, IERC4907 {
   constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
      struct Post{
        string descriptions;
        uint256 rentalpricespersecond;
      }
      
      mapping (uint256 => address[]) public users;
      mapping (uint256 => mapping(address=> uint64)) public UserExpiration;

      mapping (uint256 => Post) public posts;
     
     event postCreated(uint256 tokenId, string descriptions);
     event postRented(uint256 tokenId, address renter, uint64 duration);




      function MintPost(address to,uint256 tokenId, string memory descriptions ) public{
        _mint(to,tokenId);
        posts[tokenId] = Post(descriptions,0);
        emit postCreated(tokenId, descriptions);
      }

      function rentPost(uint256 tokenId,uint64 duration) external payable {
         uint256 rentalPrice = posts[tokenId].rentalpricespersecond * duration;
         require(msg.value >= rentalPrice, "Insufficient payement for rental , come on throw a 1 eth ! ");

            require(UserExpiration[tokenId][msg.sender] < block.timestamp, "You already have active rental rights");

            UserExpiration[tokenId][msg.sender] = block.timestamp + duration;
               users[tokenId].push(msg.sender);
               payable (ownerOf(tokenId)).transfer(msg.sender);
               emit postRented(tokenId,msg.sender, uint64(block.timestamp + duration));
      }
      function userOf(uint256 tokenId) public view override returns (address){
        for(uint i=0; i < users[tokenId].length;i++){
            address user = users[tokenId][i];
            if(UserExpiration[tokenId][user] > block.timestamp){
                return user;
            }
          
        }
        return address(0);
      
      }

      function getUsers(uint256 tokenId) public view returns (address){
           return users[tokenId];
      }
       

      }

*/
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


interface IERC4907 {
    event UpdateUser(uint256 indexed tokenId, address indexed user, uint64 expires);

    function setUser(uint256 tokenId, address user, uint64 expires) external;

    function userOf(uint256 tokenId) external view returns (address);

    function userExpires(uint256 tokenId) external view returns (uint64);
}

contract NftMintingAndRenting is ERC721, IERC4907  {
    struct UserInfo {
        address user;
        uint64 expires;
    }
     struct Post{
        string descriptions;
        uint256 rentalpricespersecond;
      }
      
      mapping (uint256 => address[]) public users;
      mapping (uint256 => mapping(address=> uint64)) public UserExpiration;

      mapping (uint256 => Post) public posts;
     
     event postCreated(uint256 tokenId, string descriptions);
     event postRented(uint256 tokenId, address renter, uint64 duration);




      function MintPost(address to,uint256 tokenId, string memory descriptions ) public{
        _mint(to,tokenId);
        posts[tokenId] = Post(descriptions,0);
        emit postCreated(tokenId, descriptions);
      }

      function rentPost(uint256 tokenId,uint64 duration) external payable {
         uint256 rentalPrice = posts[tokenId].rentalpricespersecond * duration;
         require(msg.value >= rentalPrice, "Insufficient payement for rental , come on throw a 1 eth ! ");

            require(UserExpiration[tokenId][msg.sender] < block.timestamp, "You already have active rental rights");

            UserExpiration[tokenId][msg.sender] = uint64 (block.timestamp + duration);
               users[tokenId].push(msg.sender);
               payable (ownerOf(tokenId)).transfer(msg.value);
               emit postRented(tokenId,msg.sender, uint64(block.timestamp + duration));
      }
      function userOf(uint256 tokenId) public view override returns (address){
        for(uint i=0; i < users[tokenId].length;i++){
            address user = users[tokenId][i];
            if(UserExpiration[tokenId][user] > block.timestamp){
                return user;
            }
          
        }
        return address(0);
      
      }

      function getUsers(uint256 tokenId) public view returns (address[] memory){
           return users[tokenId];
      }



    mapping(uint256 => UserInfo) private _users;

    // Constructor for ERC721 token with name and symbol
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    // Implementing setUser from IERC4907 interface
    function setUser(uint256 tokenId, address user, uint64 expires) external override  {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can set the user");
        _users[tokenId] = UserInfo(user, expires);
        emit UpdateUser(tokenId, user, expires);
    }

    // Implementing userOf from IERC4907 interface
  /*  function userOf(uint256 tokenId) external view override returns (address) {
        if (block.timestamp > _users[tokenId].expires) {
            return address(0); // No active user if expired
        }
        return _users[tokenId].user;
    } */

    // Implementing userExpires from IERC4907 interface
    function userExpires(uint256 tokenId) external view override returns (uint64) {
        return _users[tokenId].expires;
    }

    // Minting function to create a new NFT
    function mint(address to, uint256 tokenId) public  {
        _mint(to, tokenId);
    }
}