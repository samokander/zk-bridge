import "@nomicfoundation/hardhat-toolbox";
import "hardhat-tracer";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.28",
		settings: {
			optimizer: {
				enabled: true,
				runs: 999999,
			},
		},
	},
};

export default config;
