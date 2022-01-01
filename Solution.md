If you need a starting repo clone [this](https://github.com/JoinCODED/REACT-SP-PETS-AXIOS)

### Axios

1. Install `axios` using `npm`.

```shell
$ npm install axios
```

2. Until now, our data are coming from our dummy data file `petsData.js`. It's time to change that, import `axios` in `petStore.js`.

```javascript
import axios from 'axios';
```

3. Create a function called `fetchPets`.

```javascript
fetchPets = () => {};
```

4. Use the `get` method from `axios` to fetch data from our api and store the result in a variable called `response`.

```javascript
fetchPets = () => {
  const response = axios.get('http://localhost:5000/pets');
};
```

5. Remember, all `axios` method are asynchronous add `async` and `await` to your function.

```javascript
fetchPets = async () => {
  const response = await axios.get('http://localhost:5000/pets');
};
```

6. Now store the data coming from the backend in our `pets` array.

```javascript
fetchPets = async () => {
  const response = await axios.get('http://localhost:5000/pets');
  this.pets = response.data;
};
```

7. Change the `pets` array to equal an empty array and delete the import for our dummy data file.

```javascript
pets = [];
// delete this:
import petsData from './petsData';
//
```

8. Refresh your website, the data is gone, because nothing is calling our fetch function, to call it once when the website loads call it after you initiate the store instance.

```javascript
const petStore = new PetStore();
petStore.fetchPets();
export default petStore;
```

9. But what if the backend is offline, or for whatever reason the request failed, we need to catch this error. Add a try catch block to our function.

```javascript
fetchPets = async () => {
  try {
    const response = await axios.get('http://localhost:5000/pets');
    this.pets = response.data;
  } catch (error) {
    console.log(error);
  }
};
```

### Adding a pet.

1. Let's move to our `addPet` function, add `async` `await` and use the `post` `axios` method.

```javascript
addPet = async (pet) => {
  const response = await axios.post('http://localhost:5000/pets', pet);
};
```

2. We need to send the required data to the backend, so as a second argument pass our `pet` to the `post` method.

```javascript
addPet = async (pet) => {
  const response = await axios.post('http://localhost:5000/pets', pet);
};
```

3. The last thing we need to do is to add our `response.data` to the `pets` array, because the backend generates some data that we need, in this case the `id` will be generated and returned by the backend.

```javascript
addPet = async (pet) => {
  const response = await axios.post('http://localhost:5000/pets', pet);
  this.pets.push(response.data);
};
```

4. Add `try` `catch` to your function.

```javascript
addPet = async (pet) => {
  try {
    const response = await axios.post('http://localhost:5000/pets', pet);
    this.pets.push(response.data);
  } catch (error) {
    console.log(error);
  }
};
```

### Updating A Pet.

1. Let's move to our `updatePet` function, add `async` `await` and use the `put` `axios` method.

```javascript
updatePet = async (updatedPet) => {
  const response = await axios.put('http://localhost:5000/pets');
  ...
};
```

2. Lets take a look at our endpoint, it ends with `/:petId`, this means you need to pass the `id` of the thing you want to update in the url, use template litirals.

```javascript
updatePet = async (updatedPet) => {
  const response = await axios.put(`http://localhost:5000/pets/${updatedPet.id}`);
  ...
};
```

3. And as a second argument pass the data that you want to update.

```javascript
const response = await axios.put(
  `http://localhost:5000/pets/${updatedPet.id}`,
  updatedPet
);
```

4. Complete your function and add a `try` `catch`.

```javascript
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
```

### Removing A Pet.

1. The last method that we are going to implement is the `delete` method, in your adopt function add `async` `await`.

```javascript
handleAdopt = async (petId) => {
  await axios.delete(`http://localhost:5000/pets/`);
  this.pets = this.pets.filter((pet) => pet.id !== petId);
};
```

2. We don't need to store the response this time, so directly pass the `petId` in the url so the backend knows which pet to remove. Also add `try` `catch`.

```javascript
handleAdopt = async (petId) => {
  try {
    await axios.delete(`http://localhost:5000/pets/${petId}`);
    this.pets = this.pets.filter((pet) => pet.id !== petId);
  } catch (error) {
    console.log(error);
  }
};
```
