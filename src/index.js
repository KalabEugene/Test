/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */
class PowerPlant {
  active = true;
  setActive(isWorking) {
    this.active = isWorking;
  }
}

class Household {
  /** @type {Household[]} */
  neighbors = [];
  /** @type {PowerPlant[]} */
  powerPlants = [];

  /**@param {Household} household*/
  addNeighbors(household) {
    this.neighbors.push(household);
  }

  /**@param {PowerPlant} powerPlant*/
  addPowerPlant(powerPlant) {
    this.powerPlants.push(powerPlant);
  }
  /** @param {Array} path */
  hasElectricity(path = []) {
    let newNeighbors = this.neighbors.filter((elem) => !path.includes(elem));
    return !!(
      this.powerPlants.find((powerplants) => powerplants.active) ||
      newNeighbors.find((household) => {
        path.push(household);
        return household.hasElectricity(path);
      })
    );
  }
}

export class World {
  constructor() {}

  createPowerPlant() {
    return new PowerPlant();
  }

  createHousehold() {
    return new Household();
  }

  /**
   * @param {Household} household
   * @param {PowerPlant} powerPlant*/
  connectHouseholdToPowerPlant(household, powerPlant) {
    household.addPowerPlant(powerPlant);
  }

  /**
   * @param {Household} household1
   * @param {Household} household2*/
  connectHouseholdToHousehold(household1, household2) {
    household1.addNeighbors(household2);
  }

  /**
   * @param {Household} household
   * @param {PowerPlant} powerPlant*/
  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    household.powerPlants.splice(household.powerPlants.indexOf(powerPlant), 1);
  }

  /**@param {PowerPlant} powerPlant*/
  killPowerPlant(powerPlant) {
    powerPlant.setActive(false);
  }

  /**@param {PowerPlant} powerPlant*/
  repairPowerPlant(powerPlant) {
    powerPlant.setActive(true);
  }

  /**@param {Household} household*/
  householdHasEletricity(household) {
    return household.hasElectricity();
  }
}
