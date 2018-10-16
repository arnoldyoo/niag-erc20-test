pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/token/ERC20/CappedToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol';
import './NIAGTimelock.sol';

contract NIAG is CappedToken(800000000), BurnableToken {
	uint public constant INITIAL_SUPPLY = 320000000;
  string public name = 'NIAGToken';
  string public symbol = 'NIAG';
  uint8 public decimals = 8;
  address internal owner;
  mapping (address => NIAGTimelock[]) timelockList;
	mapping (address => bool) public frozenAccount;

	event FrozenFunds(address target, bool frozen);

  constructor() {
  	totalSupply_ = INITIAL_SUPPLY * 10 ** uint(decimals);
    balances[msg.sender] = INITIAL_SUPPLY;
    owner = msg.sender;
  }

  modifier isOwner {
  	require(msg.sender == owner);
    _;
  }

  modifier biggerThenZero(uint256 amount) {
  	require(amount > 0);
    _;
  }

	modifier isNotFrozen {
		require(!frozenAccount[msg.sender]);
		_;
	}

	// add lockup
  function lockUp(address _address, uint256 when, uint256 amount) public isOwner {
  	timelockList[_address].push(new NIAGTimelock(this, _address, when, amount));
  }

	// release lockup account multi
	function releaseMulti(address[] addresses) {
  	for(uint i = 0; i < addresses.length; i++) {
    	NIAGTimelock[] memory locks = timelockList[addresses[i]];

      for(uint j = 0; j < locks.length; j++) {
      	if(locks[j].releaseTime() >= block.timestamp) {
        	locks[j].release();
        }
      }
    }
  }

	// release lockup account single
  function releaseSingle(address _address) {
  	NIAGTimelock[] memory locks = timelockList[_address];
    for(uint j = 0; j < locks.length; j++) {
      if(locks[j].releaseTime() >= block.timestamp) {
      	locks[j].release();
      }
    }
  }

	// mintable multi (need diferrent amount)
  function mintMulti(address[] memory addresses, uint256 amount) public biggerThenZero(amount) {
  	for(uint256 i = 0; i < addresses.length; i++) {
    	super.mint(addresses[i], amount);
    }
  }

	// @TODO: make single mint function

	// burn totalSupply
  function burn(uint256 _value) isOwner {
    require(_value <= totalSupply_);
  	super.burn(_value);
  }

	// @TODO: freeze source
	function freezeAccount(address _address, bool _isFreeze) isOwner {
			frozenAccount[_address] = _isFreeze;
			emit FrozenFunds(_address, _isFreeze);
	}

	// transfer single
  function transfer(address to, uint256 value) public isNotFrozen returns (bool) {
    super.transfer(to, value);
  }

  // transfer multi
  function transferMulti(address[] memory addresses, mapping(address => uint256) memory values) public isNotFrozen returns (bool) {
    require (addressess.length == value.length);
    for (uint256 i = 0; i < addresses.length; i++) {
      require(values[addresses[i]] > 0);
      super.transfer(addresses[i], values[addresses[i]]);
  	}
    return true;
  }
}
