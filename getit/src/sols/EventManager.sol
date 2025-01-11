// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EventManager is Ownable {
    constructor() Ownable(msg.sender){
        
    sendNotification(msg.sender, "Welcome! You are the first user.");
}


   
    struct Event {
        string name;
        string description;
        uint256 entryFee;
        bool isPublic;
        address creator;
        uint256 startTime;
        uint256 endTime;
    }

    struct User {
        string userName;
        address userAddress;
        bool isRegistered;
    }

    uint256 public eventCount;
    mapping(uint256 => Event) public Events;
    mapping(uint256 => address[]) private attendees;
    mapping(uint256 => mapping(address => bool)) private hasRegistered;
    mapping(address => User) public users;
    mapping(address => string[]) public notification;
    address[] public allUsers;

    mapping(address => mapping(uint256 => mapping(address => bool))) private eventPermissions;

    event EventRegistered(uint256 indexed eventId, address indexed attendee);
    event NotificationSent(address indexed user, string message);
    event EventCreated(uint256 indexed eventId, string name, address indexed creator, uint256 entryFee, bool isPublic);

    modifier userExists(address userAddress) {
        require(bytes(users[userAddress].userName).length > 0, "User does not exist");
        _;
    }

    modifier onlyCreator(uint256 eventId) {
        require(Events[eventId].creator == msg.sender, "Only event creator can perform this action!");
        _;
    }

    function registerUser(string memory username) public {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(bytes(users[msg.sender].userName).length == 0, "User already registered");

        users[msg.sender] = User(username, msg.sender, true);
        allUsers.push(msg.sender); // Add to allUsers for tracking
    }

    function createEvent(
        string memory name,
        string memory description,
        uint256 entryFee,
        bool isPublic,
        uint256 startTime,
        uint256 endTime
    ) external {
        require(bytes(name).length > 0, "Event name cannot be empty");
        require(startTime < endTime, "Start time must be before end time");
        require(startTime > block.timestamp, "Event must start in the future");

        eventCount++;
        Events[eventCount] = Event(
            name,
            description,
            entryFee,
            isPublic,
            msg.sender,
            startTime,
            endTime
        );

        emit EventCreated(eventCount, name, msg.sender, entryFee, isPublic);
    }

    function registerForEvent(uint256 eventId) external payable userExists(msg.sender) {
        Event memory _event = Events[eventId];
        require(_event.creator != address(0), "Event does not exist");
        require(block.timestamp < _event.startTime, "Event has already started");
        require(!hasRegistered[eventId][msg.sender], "You are already registered for this event");

        if (!_event.isPublic) {
            require(eventPermissions[_event.creator][eventId][msg.sender], "You do not have permission to join this private event");
        }

        if (_event.entryFee > 0) {
            require(msg.value == _event.entryFee, "Incorrect entry fee");
            payable(_event.creator).transfer(msg.value);
        }

        attendees[eventId].push(msg.sender);
        hasRegistered[eventId][msg.sender] = true;

        emit EventRegistered(eventId, msg.sender);
    }

    function grantAccess(uint256 eventId, string memory username) external onlyCreator(eventId) {
        address userAddress = findUserByUsername(username);
        require(userAddress != address(0), "User not found");

        eventPermissions[msg.sender][eventId][userAddress] = true;
        sendNotification(userAddress, "You have been granted access to a private event!");

        emit NotificationSent(userAddress, "You have been granted access to a private event!");
    }

    function findUserByUsername(string memory username) public view returns (address) {
        for (uint256 i = 0; i < allUsers.length; i++) {
            address userAddress = allUsers[i];
            if (keccak256(bytes(users[userAddress].userName)) == keccak256(bytes(username))) {
                return userAddress;
            }
        }
        return address(0); // Return the zero address if the user is not found
    }

    function sendNotification(address userAddress, string memory message) internal {
        notification[userAddress].push(message);
    }

    function getNotifications(address userAddress) external view returns (string[] memory) {
        return notification[userAddress];
    }
}