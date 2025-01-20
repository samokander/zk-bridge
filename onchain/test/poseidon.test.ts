import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { deployPoseidon } from "./fixtures";

describe("Poseidon", () => {
	it("deploys", async () => {
		const { poseidon } = await loadFixture(deployPoseidon);
	});

	it("hashes", async () => {
		const { poseidon } = await loadFixture(deployPoseidon);

		const a = ethers.ZeroHash;
		const b = ethers.ZeroHash;

		const result = await poseidon.poseidon(a, b);

		console.log(result);
	});
});
