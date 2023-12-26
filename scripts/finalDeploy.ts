import { ethers } from "hardhat";
import { Coffee } from "../src/types";

async function main() {
  const coffee: Coffee = (await ethers.deployContract("Coffee")) as Coffee;
  await coffee.waitForDeployment();
  console.log(`Address of contract: `, coffee.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
