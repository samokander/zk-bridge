import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { deployPoseidon } from "./fixtures";
describe("Poseidon", () => {
	it("deploys", async () => {
		const { poseidon } = await loadFixture(deployPoseidon);
	});
	it("hashes", async () => {
		const { poseidon } = await loadFixture(deployPoseidon);
		const a = 0;
		const b = 0;
		const result = await poseidon.hash([a, b]);
		console.log(result);
	});
});
