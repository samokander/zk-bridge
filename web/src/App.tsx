import { ethers } from "ethers";
import { useEffect, useState } from "react";

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [depositNote, setDepositNote] = useState<string>("");
  const [withdrawNote, setWithdrawNote] = useState<string>("");
  const [totalDeposits, setTotalDeposits] = useState<number>(0);

  // Check for Metamask and connect
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      getBalance(accounts[0]);
    } else {
      alert("Please install Metamask!");
    }
  };

  // Get USDT balance
  const getBalance = async (address: string) => {
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
    const usdtAddress = "USDT_CONTRACT_ADDRESS"; // Replace with actual USDT contract address
    const usdtAbi = ["function balanceOf(address) view returns (uint256)"];
    const contract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    const balance = await contract.balanceOf(address);
    setBalance(ethers.formatUnits(balance, 6)); // USDT has 6 decimals
  };

  // Deposit function
  const handleDeposit = async () => {
    if (walletAddress && depositNote) {
      const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
      const signer = provider.getSigner(walletAddress);
      const contract = new ethers.Contract("SMART_CONTRACT_ADDRESS", ["function deposit(string note) public"], signer);
      await contract.deposit(depositNote);
      alert("Deposit successful!");
      setTotalDeposits((prev) => prev + 1);
    }
  };

  // Withdraw function
  const handleWithdraw = async () => {
    if (walletAddress && withdrawNote) {
      const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
      const signer = provider.getSigner(walletAddress);
      const contract = new ethers.Contract("SMART_CONTRACT_ADDRESS", ["function withdraw(string note) public"], signer);
      await contract.withdraw(withdrawNote);
      alert("Withdraw successful!");
    }
  };

  // Auto-connect wallet when the page loads
  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">MixIT</h1>
        <button className="bg-orange-500 py-2 px-4 rounded" onClick={connectWallet}>
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </header>

      <div className="flex space-x-10">
        {/* Deposit Section */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Deposit</h2>
          <p>Your Balance: {balance} USDT</p>
          <input
            type="text"
            placeholder="Enter secret note"
            value={depositNote}
            onChange={(e) => setDepositNote(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded mt-2"
          />
          <button className="bg-orange w-full py-2 rounded mt-4" onClick={handleDeposit}>
            Deposit 100$
          </button>
        </div>

        {/* Withdraw Section */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Withdraw</h2>
          <p>Total deposits: {totalDeposits}/1024</p>
          <input
            type="text"
            placeholder="Enter secret note"
            value={withdrawNote}
            onChange={(e) => setWithdrawNote(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded mt-2"
          />
          <button className="bg-orange-500 w-full py-2 rounded mt-4" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
