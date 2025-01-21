import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import approve from "../scripts/approve";
import { deployBridge } from "./fixtures";

describe("Bridge", () => {
	it("deploys", async () => {
		const { bridge, token } = await loadFixture(deployBridge);
	});

	it("deposits", async () => {
		const { bridge, token } = await loadFixture(deployBridge);
		const tokenAddress = token.target as string;
		const bridgeAddress = bridge.target as string;

		const [account] = await ethers.getSigners();

		const commitment = ethers.keccak256(ethers.toUtf8Bytes("entropy"));

		await approve(account, tokenAddress, bridgeAddress, ethers.MaxUint256);

		await bridge.deposit(commitment);

		expect(await bridge.commitments(commitment)).to.be.true;
	});
});
