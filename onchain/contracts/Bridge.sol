// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/structs/MerkleTree.sol";
import {PoseidonT3} from "poseidon-solidity/PoseidonT3.sol";

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
        tree.setup(TREE_DEPTH, ZERO_VALUE, poseidon);

        token = IERC20(_token);
        portion = _portion;
    }

    function deposit(bytes32 _commitment) public {
        if (commitments[_commitment])
            revert Bridge__ExistentCommitment(_commitment);

        token.safeTransferFrom(msg.sender, address(this), portion);

        tree.push(_commitment, poseidon);

        commitments[_commitment] = true;
    }

    function withdraw() public {
        // todo: check validity proof
    }

    function poseidon(
        bytes32 input0,
        bytes32 input1
    ) internal pure returns (bytes32) {
        return bytes32(PoseidonT3.hash([uint256(input0), uint256(input1)]));
    }
}
