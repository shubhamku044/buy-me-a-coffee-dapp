import { useEffect, useState } from "react";
import type { WalletConnection } from "../App";
import { Coffee } from "../../types";

interface IProps {
  walletConnection: WalletConnection;
}

const Memos = ({ walletConnection }: IProps) => {
  const [memos, setMemos] = useState<Coffee.MemoStructOutput[]>([]);
  const { contract } = walletConnection;
  useEffect(() => {
    const getMemos = async () => {
      const memoss: Coffee.MemoStructOutput[] = await contract?.getMemos();
      setMemos(memoss);
    };
    contract && getMemos();
  }, [contract]);

  return (
    <div className="px-4 py-16 text-lg bg-[#3F2305] text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="underline">
          <h2 className="text-5xl text-center font-bold">
            People who bought coffee☕️
          </h2>
        </div>
        <div className="mt-8 flex flex-col-reverse gap-4">
          {memos.map((memo) => {
            return (
              <div className="" key={memo.timestamp}>
                <p>Name: {memo.name}</p>
                <p>Message: {memo.message}</p>
                <p>From: {memo.from}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Memos;
