import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
class PetStore {
  pets = [];

  constructor() {
    makeObservable(this, {
      pets: observable,
      handleAdopt: action,
      addPet: action,
      updatePet: action,
    });
  }

  fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pets');
      this.pets = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  handleAdopt = async (petId) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${petId}`);
      this.pets = this.pets.filter((pet) => pet.id !== petId);
    } catch (error) {
      console.log(error);
    }
  };

  addPet = async (pet) => {
    try {
      const response = await axios.post('http://localhost:5000/pets', pet);
      this.pets.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  updatePet = async (updatedPet) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/pets/${updatedPet.id}`,
        updatedPet
      );
      this.pets = this.pets.map((pet) =>
        pet.id === updatedPet.id ? response.data : pet
      );
    } catch (error) {
      console.log(error);
    }
  };
}

const petStore = new PetStore();
petStore.fetchPets();
export default petStore;
