pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/token/ERC20/CappedToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol';
import "zeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract NIAGInfo {
	using SafeERC20 for ERC20Basic;

	uint internal constant INITIAL_SUPPLY = 320000000;
  string public name = 'NIAGToken';
  string public symbol = 'NIAG';
  uint8 public decimals = 8;
  address internal owner;
}

contract NIAG is CappedToken(800000000), BurnableToken, NIAGInfo {
	struct LockInfo {
		address _beneficiary;
    uint256 _releaseTime;
    uint256 _amount;
	}

  mapping (address => LockInfo[]) timelockList;
	mapping (address => bool) public frozenAccount;

	event LogString(string str);
	event FrozenFunds(address target, bool frozen);
	event LockUp(address who, uint256 when, uint256 amount);

  constructor() public {
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
  function lockUp(address _address, uint256 when, uint256 amount) public isOwner returns (bool) {

		LockInfo memory lock;
		lock._amount = amount;
		lock._releaseTime = when;
		lock._beneficiary = _address;
		timelockList[_address].push(lock);
		emit LockUp(_address, when, amount);

		return true;
  }

	function _release(LockInfo lock) private {
    // require(now >= lock._releaseTime);
    require(lock._amount > 0);
    require(super.transfer(lock._beneficiary, lock._amount));
  }


	// release lockup account single
  function release(address _address) public isOwner returns (bool) {
  	LockInfo[] memory locks = timelockList[_address];
    for(uint j = 0; j < locks.length; j++) {
      if(locks[j]._releaseTime >= block.timestamp) {
      	_release(locks[j]);
      }
    }
		return true;
  }

	// mintable multi (need diferrent amount)
  function mintMulti(address[] memory addresses, uint256 amount) public isOwner biggerThenZero(amount) {
  	for(uint256 i = 0; i < addresses.length; i++) {
    	super.mint(addresses[i], amount);
    }
  }

	// single mint
	function mintSingle(address _address, uint256 amount) public isOwner biggerThenZero(amount) {
  	super.mint(_address, amount);
  }

	// burn totalSupply
  function burn(uint256 _value) public isOwner {
    require(_value <= totalSupply_);
  	super.burn(_value);
  }

	// @TODO: freeze source
	function freezeAccount(address _address) public isOwner {
			require(frozenAccount[_address] == false);
			frozenAccount[_address] = true;
			emit FrozenFunds(_address, true);
	}

	// unfrozen
	function unFreezeAccount(address _address) public isOwner {
		require(frozenAccount[_address] == true);
		frozenAccount[_address] = false;

		emit FrozenFunds(_address, false);
	}

	// transfer single
  function transfer(address to, uint256 value) public isNotFrozen returns (bool) {
    super.transfer(to, value);
  }

  // transfer multi
  function transferMulti(address[] memory addresses, uint256[] memory values) public isNotFrozen returns (bool) {
    require (addresses.length == values.length);
    for (uint256 i = 0; i < addresses.length; i++) {
      super.transfer(addresses[i], values[i]);
  	}
    return true;
  }
}
