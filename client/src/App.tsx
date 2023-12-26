import abi from "../../artifacts/contracts/Coffee.sol/Coffee.json";
import { BrowserProvider, Contract, Signer, ethers } from "ethers";
import { useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers/dist/MetaMaskInpageProvider";
import { BuyCoffee, Memos } from "./components";

export interface WalletConnection {
  provider: BrowserProvider | null;
  signer: Signer | null;
  contract: Contract | null;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

function App() {
  const [walletConnection, setWalletConnection] = useState<WalletConnection>({
    provider: null,
    signer: null,
    contract: null,
  });
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xf9d10b82329082a1390c7bd74997180065f3ca57";
      const contractAbi = abi.abi;
      try {
        if (
          typeof window !== "undefined" &&
          typeof window.ethereum !== "undefined"
        ) {
          const { ethereum } = window;
          const accounts = (await ethereum.request({
            method: "eth_requestAccounts",
          })) as string[];
          const provider = new ethers.BrowserProvider(ethereum, "sepolia");
          const signer = await provider.getSigner(accounts[0]);
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setWalletConnection({ provider, signer, contract });
        }
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <main className="min-h-screen">
      <BuyCoffee walletConnection={walletConnection} />
      <Memos walletConnection={walletConnection} />
    </main>
  );
}

export default App;
