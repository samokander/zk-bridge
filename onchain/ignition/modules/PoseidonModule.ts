import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PoseidonModule = buildModule("Poseidon", (m) => {
	const poseidon = m.contract("PoseidonT3");

	return { poseidon };
});

export default PoseidonModule;
