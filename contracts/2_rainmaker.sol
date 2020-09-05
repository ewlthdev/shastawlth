pragma solidity 0.5.8;
 
contract Hourglass {
    function reinvest() public {}
    function withdraw() public returns(address) {}
    function myTokens() public view returns(uint256) {}
    function myDividends(bool) public view returns(uint256) {}
    function buy(address) public payable returns(uint256) {}
}

contract RainMaker {
    Hourglass hg;
    address public hourglassAddress;
    uint256 public newBalance;
    
    constructor(address _hourglass) public {
        hg = Hourglass(_hourglass);
        hourglassAddress = _hourglass;
    }
    
    function() external payable {}

    function reinvest(address _playerAddress) public {
        hg.withdraw(); // withdraw the rainmakers current dividends
        uint256 bal = address(this).balance;
        hg.buy.value(bal)(_playerAddress);
    }

    function myTokens() public view returns(uint256) {return hg.myTokens();}
    function myDividends() public view returns(uint256) {return hg.myDividends(true);}
}

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {return 0;}
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}