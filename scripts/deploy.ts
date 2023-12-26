import { ethers } from "hardhat";
import { Coffee } from "../src/types";

async function getBalances(address: string) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses: string[]) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balances: `, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos: Coffee.MemoStructOutput[]) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(
      `At ${timestamp}, name: ${name}, address: ${from}, message: ${message}`
    );
  }
}

async function main() {
  let coffee: Coffee;
  const [owner, from1, from2, from3, from4, from5, from6] =
    await ethers.getSigners();

  coffee = (await ethers.deployContract("Coffee")) as Coffee;

  await coffee.waitForDeployment();

  console.log(`Address of contract: `, coffee.target);
  const addresses: string[] = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
    from4.address,
    from5.address,
    from6.address,
  ];

  await coffee.connect(from1).buyMeACoffee("from1", "very nice coffee", {
    value: ethers.parseEther("4"),
  });
  await coffee.connect(from2).buyMeACoffee("from2", "very nice coffee", {
    value: ethers.parseEther("19"),
  });
  await coffee.connect(from3).buyMeACoffee("from3", "very nice coffee", {
    value: ethers.parseEther("91"),
  });
  await coffee.connect(from4).buyMeACoffee("from4", "very nice coffee", {
    value: ethers.parseEther("423"),
  });
  await coffee.connect(from5).buyMeACoffee("from5", "very nice coffee", {
    value: ethers.parseEther("1934"),
  });
  await coffee.connect(from6).buyMeACoffee("from6", "very nice coffee", {
    value: ethers.parseEther("9451"),
  });

  console.log("After buying coffee");
  await consoleBalances(addresses);
  const memos: Coffee.MemoStructOutput[] = await coffee.getMemos();
  await consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
