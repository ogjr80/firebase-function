const admin = require("firebase-admin");
const serviceAccount = require("./serviceaccounts.json"); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
module.exports = db; 


const resolvers = {
  Query: {
    //User Query Resolvers
    getUser: async (_, { userId }) => {
      const userDoc = await db.collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data() : null;
    },
    getUsers: async () => {
      const usersSnapshot = await db.collection('users').get();
      return usersSnapshot.docs.map(doc =>({ userId: doc.id, ...doc.data() }));
    },
    //Farm Query Resolvers
    getFarm: async (_, { farmId }) => {
      const farmDoc = await db.collection('farms').doc(farmId).get();
      return farmDoc.exists ? farmDoc.data() : null;
    },
    getFarms: async () => {
      const farmsSnapshot = await db.collection('farms').get();
      return farmsSnapshot.docs.map(doc => ({farmid: doc.id, ...doc.data()}));
    },
    getFarmsByUserId: async (_, { userId }) => {
      const farmsSnapshot = await db.collection('farms').where('userId', '==', userId).get();
      return farmsSnapshot.docs.map(doc => doc.data());
    },

    //CROP Query Resolvers 
    getCrop: async (_, { cropId }) => {
      const cropDoc = await db.collection('crops').doc(cropId).get();
      return cropDoc.exists ? cropDoc.data() : null;
    },
    getCrops: async () => {
      const cropsSnapshot = await db.collection('crops').get();
      return cropsSnapshot.docs.map(doc => ({cropId: doc.id, ...doc.data()}));
    },

    //Livestock Query Resolvers 
    getLivestock: async (_, { livestockId }) => {
      const livestockSnapshot = await db.collection("livestocks").doc(livestockId).get();
      return {
        ...livestockSnapshot.data(),
        livestockId: livestockSnapshot.id,
      };
    },
    getAllLivestock: async () => {
      const livestockSnapshot = await db.collection("livestocks").get();
      return livestockSnapshot.docs.map(doc => ({
        ...doc.data(),
        livestockId: doc.id,
      }));
    },

    //WeatherData Query Resolvers 
    getAllWeatherData: async () => {
      const weatherDataSnapshot = await db.collection("weatherData").get();
      return weatherDataSnapshot.docs.map(doc => ({
        ...doc.data(),
        weatherDataId: doc.id,
      }));
    },
    getWeatherData: async (_, { weatherDataId }) => {
      const weatherDataSnapshot = await db.collection("weatherData").doc(weatherDataId).get();
      return {
        ...weatherDataSnapshot.data(),
        weatherDataId: weatherDataSnapshot.id,
      };
    },
    getWeatherDataByFarmId: async (_, { farmId }) => {
      const querySnapshot = await db.collection("weatherData").where("farmId", "==", farmId).get();
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        weatherDataId: doc.id,
      }));
    },
   
  },
  Mutation: {

    //User Mutation
    createUser: async (_, { input }) => {
      const newUser = {
        ...input,
        userId: db.collection('users').doc().id,
        dateCreated: new Date().toISOString(),
      };
      await db.collection('users').doc(newUser.userId).set(newUser);
      return newUser;
    },
    updateUser: async (_, { userId, input }) => {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      const updatedUser = {
        ...userDoc.data(),
        ...input,
      };

      await userRef.update(updatedUser);

      return updatedUser;
    },

    //Farm Mutation
    createFarm: async (_, { input }) => {
      const newFarm = {
        ...input,
        farmId: db.collection('farms').doc().id,
        dateCreated: new Date().toISOString(),
      };
      await db.collection('farms').doc(newFarm.farmId).set(newFarm);
      return newFarm;
    },
    updateFarm: async (_, { farmId, input }) => {
      const farmRef = db.collection('farms').doc(farmId);
      const farmDoc = await farmRef.get();

      if (!farmDoc.exists) {
        throw new Error(`Farm with ID ${farmId} not found.`);
      }

      const updatedFarm = {
        ...farmDoc.data(),
        ...input,
      };

      await farmRef.update(updatedFarm);

      return updatedFarm;
    },

    //CROP Mutation 
    async createCrop(_, { input }) {
      const newCropData = {
        ...input,
        dateCreated: new Date().toISOString(),
      };
      const cropRef = await db.collection("crops").add(newCropData);
      const crop = await cropRef.get();
      
      // Add the cropId using the document ID from Firebase
      return {
        ...crop.data(),
        cropId: crop.id,
        farmId: farm.id,
        userId: user.id
      };
    },
    updateCrop: async (_, { cropId, input }) => {
      const cropDoc = db.collection('crops').doc(cropId);
      await cropDoc.update(input);
      const updatedCrop = await cropDoc.get();
      return updatedCrop.exists ? updatedCrop.data() : null;
    },
    deleteCrop: async (_, { cropId }) => {
      await db.collection('crops').doc(cropId).delete();
      return `Crop with ID ${cropId} has been deleted`;
    },
    //Livestock Mutation 
    createLivestock: async (_, { input }) => {
      const newLivestockData = {
        ...input,
        dateCreated: new Date().toISOString(),
      };
      const livestockRef = await db.collection("livestocks").add(newLivestockData);
      const livestock = await livestockRef.get();
      
      return {
        ...livestock.data(),
        livestockId: livestock.id,
      };
    },
    updateLivestock: async (_, { livestockId, input }) => {
      const livestockRef = db.collection("livestocks").doc(livestockId);
      await livestockRef.update(input);
      
      const updatedLivestock = await livestockRef.get();
      
      return {
        ...updatedLivestock.data(),
        livestockId: updatedLivestock.id,
      };
    },
    deleteLivestock: async (_, { livestockId }) => {
      const livestockRef = db.collection("livestocks").doc(livestockId);
      const deletedLivestock = await livestockRef.get();
      
      await livestockRef.delete();
      
      return {
        ...deletedLivestock.data(),
        livestockId: deletedLivestock.id,
      };
    },
    //WeatherData Mutation
    createWeatherData: async (_, { input }) => {
      const newWeatherDataRef = await db.collection("weatherData").add(input);
      const newWeatherDataSnapshot = await newWeatherDataRef.get();
      return {
        ...newWeatherDataSnapshot.data(),
        weatherDataId: newWeatherDataSnapshot.id,
      };
    },
    updateWeatherData: async (_, { weatherDataId, input }) => {
      const weatherDataRef = db.collection("weatherData").doc(weatherDataId);
      await weatherDataRef.update(input);
      const updatedWeatherDataSnapshot = await weatherDataRef.get();
      return {
        ...updatedWeatherDataSnapshot.data(),
        weatherDataId: updatedWeatherDataSnapshot.id,
      };
    },

  },

  //Chaining in Mutations
  //User Chaining
  User: {
    farms: async (parent) => {
      const userId = parent.userId;
      const farmsSnapshot = await db.collection('farms').where('userId', '==', userId).get();
      return farmsSnapshot.docs.map(doc => ({farmId:doc.id, ...doc.data()}));
    },
  },

  //Farm Chaining
  Farm: {
    user: async (parent) => {
      const userId = parent.userId;
      const userDoc = await db.collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data() : null;
    },
    crops: async (parent) => {
      const farmId = parent.farmId;
      const cropsSnapshot = await db.collection('crops').where('farmId', '==', farmId).get();
      return cropsSnapshot.docs.map(doc => ({cropId: doc.id, ...doc.data()}));
    },
    livestocks: async (parent) => {
      const querySnapshot = await db.collection("livestocks").where("farmId", "==", parent.farmId).get();
      if (querySnapshot.empty) {
        return [];
      }
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        livestockId: doc.id,
      }));
    },
    weatherData: async (parent) => {
      const querySnapshot = await db.collection("weatherData").where("farmId", "==", parent.farmId).get();
      if (querySnapshot.empty) {
        return [];
      }
      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        weatherDataId: doc.id,
      }));
    },
    // Add other resolvers for crops, livestocks, etc.
  },

  //Crop Chaining 
  Crop: {
    farm: async (parent) => {
      const farmId = parent.farmId;
      const farmDoc = await db.collection('farms').doc(farmId).get();
      return farmDoc.exists ? farmDoc.data() : null;
    },
    user: async (parent) => {
      const userId = parent.userId;
      const userDoc = await db.collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data() : null;
    },
  },
  //Livestock Chaining
  Livestock: {
    farm: async (parent) => {
      const farmId = parent.farmId;
      const farmSnapshot = await db.collection("farms").doc(farmId).get();
      
      return { farmId: farmSnapshot.id, ...farmSnapshot.data() };
    },
    user: async (parent) => {
      const userId = parent.userId;
      const userSnapshot = await db.collection("users").doc(userId).get();
      
      return { userId: userSnapshot.id, ...userSnapshot.data() };
    },
  },

  //WeaterData chaining 
  WeatherData: {
    farm: async (parent) => {
      const farmSnapshot = await db.collection("farms").doc(parent.farmId).get();
      return {
        ...farmSnapshot.data(),
        farmId: farmSnapshot.id,
      };
    },
  },
};


module.exports = resolvers;




