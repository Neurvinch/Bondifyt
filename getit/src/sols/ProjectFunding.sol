
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract ProjectFunding  {
       struct Milestone{
        string description;
        uint amount;
        bool isCompleted;
       }

       address public creator;
       Milestone[] public milestones;
       uint public nextMilestoneID;
       uint public totalFunds;
       bool public fundingCompleted;

       constructor(address _creator) {
        creator = _creator;
       }

    function AddMilestone(string memory _description,uint _amount ) public {
             milestones.push(Milestone(_description , _amount, false));
             nextMilestoneID++; // this might not useful becoz we use array's indexing to acced the project
             totalFunds += _amount;
    }
    function fundTheProject() public payable {
         require (msg.value >= totalFunds, "Insufficent fund bruh!");
         fundingCompleted = true ;
    }
        function  FundsRelease (uint _milestoneID) public {
             Milestone storage milestone = milestones[_milestoneID];
             require(!milestone.isCompleted, 'Milestone already completed bruh ');
             milestone.isCompleted = true;
             payable(creator).transfer(milestone.amount);


        }

 }