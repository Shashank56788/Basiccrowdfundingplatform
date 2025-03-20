// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicCrowdfunding {

    address public owner;
    uint public goal;
    uint public deadline;
    uint public totalFunds;
    mapping(address => uint) public contributions;
    bool public isCampaignActive;

    event Funded(address indexed contributor, uint amount);
    event CampaignEnded(bool success, uint totalFundsRaised);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this");
        _;
    }

    modifier campaignActive() {
        require(isCampaignActive, "Campaign is not active");
        _;
    }

    modifier goalNotReached() {
        require(totalFunds < goal, "Goal has already been reached");
        _;
    }

    modifier afterDeadline() {
        require(block.timestamp >= deadline, "Campaign is still active");
        _;
    }

    constructor(uint _goal, uint _duration) {
        owner = msg.sender;
        goal = _goal;
        deadline = block.timestamp + _duration;
        isCampaignActive = true;
    }

    function contribute() public payable campaignActive goalNotReached {
        require(msg.value > 0, "Contribution must be greater than 0");
        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;
        emit Funded(msg.sender, msg.value);
    }

    function endCampaign() public onlyOwner afterDeadline {
        isCampaignActive = false;
        bool success = totalFunds >= goal;
        if (success) {
            payable(owner).transfer(totalFunds);
        }
        emit CampaignEnded(success, totalFunds);
    }

    function getRefund() public afterDeadline {
        require(totalFunds < goal, "Goal was reached, no refund");
        uint contributedAmount = contributions[msg.sender];
        require(contributedAmount > 0, "No funds to refund");

        contributions[msg.sender] = 0; // Prevent re-entrancy attack
        payable(msg.sender).transfer(contributedAmount);
    }

    function getCurrentBalance() public view returns (uint) {
        return address(this).balance;
    }
}
