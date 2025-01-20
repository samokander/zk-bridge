import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PoseidonModule = buildModule("Poseidon", (m) => {
	const poseidon = m.contract("Poseidon");

	return { poseidon };
});

export default PoseidonModule;
