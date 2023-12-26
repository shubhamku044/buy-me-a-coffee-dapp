import { ChangeEvent, useCallback, useEffect, useState } from "react";
import type { WalletConnection } from "../App";
import { ethers } from "ethers";

interface IProps {
  walletConnection: WalletConnection;
}

const BuyCoffee = ({ walletConnection }: IProps) => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [eth, setEth] = useState(0.001)
  const { contract } = walletConnection;

  const buy = useCallback(async () => {
    if (eth <= 0.0000001) throw new Error('Increase the amount');
    const amount = { value: ethers.parseEther(`${eth}`) };
    const transaction = await contract?.buyMeACoffee(name, message, amount);
    await transaction.wait();
    setName('')
    setMessage('')
    setEth(0.001)
  }, [name, message, contract, eth]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      console.log("running");
      event.preventDefault();
      buy();
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [buy]);
  return (
    <div
      className="flex justify-center sticky top-0 min-h-[60vh] items-center flex-col text-lg bg-slate-600 bg-cover bg-no-repeat"
      style={{
        background:
          "linear-gradient(to bottom right,rgba(22, 12, 5, 0.9), rgba(57, 36, 21, 0.3)) , url('/coffee.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundClip: "padding-box",
      }}
    >
      <div className="flex w-80 items-start gap-4 flex-col justify-center">
        <input
          className="border-gray-200 w-full border-2 px-4 py-2 rounded-lg outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Name"
          value={name}
        />
        <input
          className="border-gray-200 border-2 w-full px-4 py-2 rounded-lg outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
          }}
          type="text"
          placeholder="Message"
          value={message}
        />
        <button
          className="bg-blue-500 shadow-lg shadow-gray-800 w-full px-8 rounded-lg font-semibold hover:bg-blue-700 duration-200 active:bg-blue-800 py-4 text-white"
          onClick={buy}
        >
          Buy me a coffee ☕
        </button>
      </div>
      <input
        type="number"
        className="absolute bottom-4 right-4 bg-black/70 text-white font-semibold outline-none p-2 text-sm w-36 rounded-md"
        step={0.001}
        min={0}
        value={eth}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setEth(parseFloat(event.target.value))
        }}
      />
    </div>
  );
};

export default BuyCoffee;
