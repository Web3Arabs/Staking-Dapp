const {ethers} = require("hardhat");

async function main() {
	/*
    لنشر عقود ذكية جديدة getContractFactory يستخدم
  */
  const StackingContract = await ethers.getContractFactory("Staking");

	// هنا نقوم برفع العقد
  const contract = await StackingContract.deploy();

  // انتظر حتى تنتهي عملية الرفع
  await contract.deployed();

  // طباعة عنوان العقد المنشور
  console.log(
    `Contract is deployed to ${contract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});