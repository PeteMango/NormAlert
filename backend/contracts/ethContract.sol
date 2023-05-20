// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // State variables
    uint public myVariable;

    // Constructor
    constructor() {
        myVariable = 0;
    }

    // Function to update the state variable
    function updateVariable(uint newValue) public {
        myVariable = newValue;
    }

    // Function to retrieve the current value of the state variable
    function getVariable() public view returns (uint) {
        return myVariable;
    }
}
