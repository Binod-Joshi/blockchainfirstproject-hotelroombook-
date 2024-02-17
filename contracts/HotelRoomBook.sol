//SPDX-License-Identifier: GPL-3.0

// Uncomment this line to use console.log
// import "hardhat/console.sol";
pragma solidity ^0.8.9;

// muile solc fix nai thi garya

contract HotelRoomBook {
    enum Statuses {vacant,occupied}
    Statuses public currentStatus;

    event Occupy(address _occupant, uint _value);
    address  payable immutable public owner; // payable is special modifier which is used to receive the ether.

    constructor(){
        owner = payable(msg.sender); // msg is global varaible in solidity and sender is property
        currentStatus = Statuses.vacant;
    }

    modifier onlyWhileVacant {
        require(currentStatus == Statuses.vacant,"Already occupied");
        _; // it is return function code.
    }

    modifier costs(uint _amount){
        require(msg.value >= _amount , "Not enough ether provided");
        _;
    }

    modifier onlyWhileOccupied{
        require(currentStatus == Statuses.occupied,"Room is aleady vacant/free.");
        _;
    }

    // function getStatus() public view returns (Statuses) {
    //     return currentStatus; /// it gives position
    // }
     function getStatus() public view returns (string memory) {
        return getStatusString(currentStatus);
    }

    function getStatusString(Statuses status) internal pure returns (string memory) {
        if (status == Statuses.vacant) {
            return "vacant";
        } else{
            return "occupied";
        }
    }

    function bookTheRoom() public payable onlyWhileVacant costs(0.01 ether) {

        currentStatus = Statuses.occupied; 
        // owner.transfer(msg.value); // sending ether to owner and there are some issues with transfer in solidity so i am going use call
        (bool sent,) = owner.call{value:msg.value}("");
        require(sent); 
        
        // event trigger after transcation
        emit Occupy(msg.sender, msg.value);
    }

    function freeTheRoom() public onlyWhileOccupied {
        currentStatus = Statuses.vacant;
    }
}