pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";


/**
 * @title TokenTimelock
 * @dev TokenTimelock is a token holder contract that will allow a
 * beneficiary to extract the tokens after a given release time
 */
contract NIAGTimelock {
  using SafeERC20 for ERC20Basic;

  // ERC20 basic token contract being held
  ERC20Basic public token;

  // beneficiary of tokens after they are released
  address public beneficiary;

  // timestamp when token release is enabled
  uint256 public releaseTime;

  uint256 private amount;

  constructor(
    ERC20Basic _token,
    address _beneficiary,
    uint256 _releaseTime,
    uint256 _amount
  )
    public
  {
    // solium-disable-next-line security/no-block-members
    require(_releaseTime > block.timestamp);
    require(_amount > 0);
    token = _token;
    beneficiary = _beneficiary;
    releaseTime = _releaseTime;
    amount = _amount;
  }

  /**
   * @notice Transfers tokens held by timelock to beneficiary.
   */
  function release() public {
    // solium-disable-next-line security/no-block-members
    require(block.timestamp >= releaseTime);

    require(amount > 0);

    token.safeTransfer(beneficiary, amount);
  }
}
