import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import TokenModule from "./TokenModule";

const BridgeModule = buildModule("Bridge", (m) => {
	const { token } = m.useModule(TokenModule);
	const portion = m.getParameter("portion");

	const bridge = m.contract("Bridge", [token, portion]);

	return { bridge, token };
});

export default BridgeModule;
