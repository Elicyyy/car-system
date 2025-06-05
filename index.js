
class Car {
  constructor(plateNumber, timeIn) {
    this.plateNumber = plateNumber;
    this.timeIn = timeIn; 
    this.timeOut = null;
    this.slot = null;
  }

  setTimeOut(timeOut) {
    this.timeOut = timeOut;
  }

  calculateAmount() {
    const diffHours = Math.ceil((this.timeOut - this.timeIn) / 3600000); 
    if (diffHours <= 1) {
      return 500;
    } else {
      return 500 + (diffHours - 1) * 300;
    }
  }
}


class CarPark {
  constructor(maxSize = 50) {
    this.maxSize = maxSize;
    this.slots = new Array(maxSize).fill(null); 
  }

  isFull() {
    return this.slots.every(slot => slot !== null);
  }

  parkCar(car) {
    const index = this.slots.findIndex(slot => slot === null);
    if (index === -1) {
      console.log("Car park is full.");
      return false;
    }
    car.slot = index + 1;
    this.slots[index] = car;
    console.log(`Car with plate ${car.plateNumber} parked at slot ${car.slot}`);
    return true;
  }

  removeCar(plateNumber, timeOut) {
    const index = this.slots.findIndex(
      car => car && car.plateNumber === plateNumber
    );
    if (index === -1) {
      console.log("Car not found.");
      return;
    }
    const car = this.slots[index];
    car.setTimeOut(timeOut);
    const amount = car.calculateAmount();
    this.slots[index] = null;
    console.log(`Car with plate ${plateNumber} removed. Amount to pay: ${amount} Rwf`);
  }

  traverseCars() {
    this.slots.forEach((car, index) => {
      if (car) {
        console.log(
          `Slot ${index + 1}: Plate ${car.plateNumber}, Time In: ${car.timeIn}`
        );
      }
    });
  }
}


const park = new CarPark();
const car1 = new Car("RAA123A", new Date("2025-06-05T10:00:00"));
const car2 = new Car("RAB456B", new Date("2025-06-05T11:00:00"));

park.parkCar(car1);
park.parkCar(car2);


park.removeCar("RAA123A", new Date("2025-06-05T13:30:00"));
park.traverseCars();
