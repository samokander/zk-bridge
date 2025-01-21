import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import PoseidonModule from "./PoseidonModule";
import TokenModule from "./TokenModule";

const BridgeModule = buildModule("Bridge", (m) => {
	const { token } = m.useModule(TokenModule);
	const { poseidon } = m.useModule(PoseidonModule);

	const portion = m.getParameter("portion");

	const bridge = m.contract("Bridge", [token, portion], { libraries: { PoseidonT3: poseidon } });

	return { bridge, token };
});

export default BridgeModule;
