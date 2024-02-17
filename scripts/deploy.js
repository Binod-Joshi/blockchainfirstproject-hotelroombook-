//imports 
const hre = require("hardhat"); // you can able to import ethers,run,network by destructing

//async main
async function main(){
  const SimpleStorageFactory = await hre.ethers.getContractFactory("HotelRoomBook"); // fetching the bycode from artifacts which come after compilation
  console.log("deploying....");

  // creating instance of smart contract
  const simpleStorage = await SimpleStorageFactory.deploy();  //deploy(456) if number have to passed to constructor

  // deploying the smart contract
  await simpleStorage.waitForDeployment()

  console.log(`Deployed contract to ${simpleStorage.target}`); // contract address

  // for not verifying into hardhat because hardhat.etherscan doesn't exist
  console.log(hre.network.config.chainId);
  if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY){
    console.log("waiting for 6 deployment transcation.");
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target,[])
  }



  // interacting with smart contract
  const currentStatus = await simpleStorage.getStatus();
  console.log(`The status of the hotel room is ${currentStatus}`);
  
  const bookingRoom = await simpleStorage.bookTheRoom({ value: hre.ethers.parseEther("0.01") });
  await bookingRoom.wait(1);

  let updatedValue = await simpleStorage.getStatus();
  console.log(`The status of the hotel room is ${updatedValue}`);

  const freeTheRoom = await simpleStorage.freeTheRoom();
  await freeTheRoom.wait(1);

  // // Fetch the currentStatus again after the changes
  updatedValue = await simpleStorage.getStatus();
  console.log(`The status of the hotel room is ${updatedValue}`);

}

async function verify(contractAddress, args){
  console.log("Verifying contact...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("Already Verified");
    }else{
      console.log(error);
    }
  }
}

//main
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
})

