// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Bridge {
    using SafeERC20 for IERC20;

    IERC20 immutable token;
    uint immutable portion;

    constructor(address _token, uint _portion) {
        token = IERC20(_token);
        portion = _portion;
    }

    function deposit() public {
        token.safeTransferFrom(msg.sender, address(this), portion);

        // todo: add to merkle tree
    }

    function withdraw() public {
        // todo: check validity proof
    }
}
