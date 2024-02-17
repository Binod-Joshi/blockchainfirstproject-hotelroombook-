// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const {ethers} = require("hardhat");
const { expect,assert } = require("chai");


describe("HotelRoomBook",function (){
  let hotelRoomFactory,hotelRoom;
  beforeEach(async function () {
     hotelRoomFactory = await ethers.getContractFactory("HotelRoomBook");
     hotelRoom = await hotelRoomFactory.deploy();
  });

  it("Should start with vacant",async function(){
    const currentStatus = await hotelRoom.getStatus();
    const expectedStatus = "vacant";
    // expect , assert
    assert.equal(currentStatus,expectedStatus)

  });

  it("Should be occupied after paying", async function(){
    const bookingRoom = await hotelRoom.bookTheRoom({value:ethers.parseEther("0.01")});
    await bookingRoom.wait(1);

    const currentStatus = await hotelRoom.getStatus();
    const expectedStatus = "occupied";
    assert.equal(currentStatus,expectedStatus);
  })

  it("Should be vacant after freeing the room",async function() {
    // npx hardhat test --grep one word from it sentence which is unique from other it --> for running this test only
    const bookingRoom = await hotelRoom.bookTheRoom({value:ethers.parseEther("0.01")});
    await bookingRoom.wait(1);
    const freeingRoom = await hotelRoom.freeTheRoom();
    await freeingRoom.wait(1);

    const currentStatus = await hotelRoom.getStatus();
    const expectedStatus = "vacant";
    assert.equal(currentStatus,expectedStatus);

  })
})