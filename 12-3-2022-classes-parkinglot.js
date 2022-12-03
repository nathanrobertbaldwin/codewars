// Don't paste this:

class Bike {

    constructor(license) {
        this.license = license;
    }
}

class Car {

    constructor(license) {
        this.license = license;
    }
}

class Van {

    constructor(license) {
        this.license = license;
    }
}

const b = new Bike('AB-123');
const c = new Car('CD-456');
const v = new Van('EF-789');
const x = new Car('xxx-000')

// Paste this:

class ParkingLot {

    constructor(size) {
        this.size = size;
        let lot = [];
        for (let i = 0; i < size; i++) {
            lot[i] = 0;
        }
        this.lot = lot;
    }

    _drawVehicle(vehicle) {

        if (vehicle instanceof Bike) return [vehicle.license];
        if (vehicle instanceof Car) return [vehicle.license, vehicle.license];
        if (vehicle instanceof Van) return [vehicle.license, vehicle.license, vehicle.license];
    }

    _availableSpace(sliceOfLot) {

        if (Math.max(...sliceOfLot) === 0) return true;
        return false;
    }

    park(vehicle) {

        let vehicleDrawing = this._drawVehicle(vehicle);

        for (let i = 0; i < this.size; i++) {
            if (!this.lot[i]) {
                if (this._availableSpace(this.lot.slice(i, i + vehicleDrawing.length))) {
                    this.lot.splice(i, vehicleDrawing.length, ...vehicleDrawing)
                    break;
                }
            }
        }
        return this.lot.includes(vehicle.license);
    }

    retrieve(license) {
        if (this.lot.includes(license)) {
           this.lot = this.lot.map((parkingSpot) => {
                return parkingSpot === license ? 0 : parkingSpot;
            })
            return true;
        }
        return false;
    }
}

const newLot = new ParkingLot(6);
console.log("Lot Setup:", newLot.lot);
console.log("------------")
console.log(newLot.park(b))
console.log("Parked a new vehicle?:", newLot.lot);
console.log(newLot.park(c));
console.log(newLot.park(v));
console.log("Full Lot:", newLot.lot );
console.log("Parked a new vehicle in a full lot?:", newLot.park(x));
console.log("Retrieve vehicle?", newLot.retrieve('EF-789'));
console.log("Lot with vehicle removed:", newLot.lot);
