import "@nomicfoundation/hardhat-ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import "hardhat/types";
import { IERC20__factory } from "../typechain-types";

export default async function approve(signer: SignerWithAddress, token: string, spender: string, value: bigint) {
	try {
		const tx = await IERC20__factory.connect(token, signer).approve(spender, value);

		await tx.wait();
	} catch (err) {
		throw "Not successful approve";
	}
}
