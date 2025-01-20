// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/structs/MerkleTree.sol";
import "./Poseidon.sol";

contract Bridge {
    using SafeERC20 for IERC20;
    using MerkleTree for MerkleTree.Bytes32PushTree;

    error Bridge__ExistentCommitment(bytes32 commitment);

    bytes32 constant ZERO_VALUE = keccak256("bridge");
    uint8 constant TREE_DEPTH = 20;

    IERC20 public immutable token;
    uint256 public immutable portion;

    MerkleTree.Bytes32PushTree private tree;

    mapping(bytes32 => bool) public commitments;

    constructor(address _token, uint256 _portion) {
        token = IERC20(_token);
        portion = _portion;

        tree.setup(TREE_DEPTH, ZERO_VALUE, Poseidon._poseidon);
    }

    function deposit(bytes32 _commitment) public {
        require(
            !commitments[_commitment],
            Bridge__ExistentCommitment(_commitment)
        );

        token.safeTransferFrom(msg.sender, address(this), portion);

        tree.push(_commitment, Poseidon._poseidon);

        commitments[_commitment] = true;
    }

    function withdraw() public {
        // todo: check validity proof
    }
}
