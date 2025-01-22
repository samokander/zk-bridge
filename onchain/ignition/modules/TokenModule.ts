import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("Token", (m) => {
	const owner = m.getAccount(0);

	const token = m.contract("Token", [owner]);

	return { token };
});

export default TokenModule;
