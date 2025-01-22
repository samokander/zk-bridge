import { ignition } from "hardhat";
import BridgeModule from "../ignition/modules/BridgeModule";
import PoseidonModule from "../ignition/modules/PoseidonModule";
import parameters from "../ignition/parameters.json";
import { Bridge, Poseidon, Token } from "../typechain-types";

export async function deployBridge() {
	const { bridge, token } = await ignition.deploy(BridgeModule, { parameters });

	return { bridge: bridge as unknown as Bridge, token: token as unknown as Token };
}

export async function deployPoseidon() {
	const { poseidon } = await ignition.deploy(PoseidonModule);

	return { poseidon: poseidon as unknown as Poseidon };
}
