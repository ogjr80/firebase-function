

const typeDefs = `

type IoTDevices {
  deviceId: ID!
  userId: ID!
  farmId: ID!
  type: String!
  location: Location!
  data: JSONObject!
  lastUpdated: String!
}

type Location {
  latitude: Float!
  longitude: Float!
}

scalar JSONObject

type WeatherData {
  weatherDataId: ID!
  farmId: ID!
  date: String!
  temperature: Float!
  humidity: Float!
  rainfall: Float!
  windSpeed: Float!
}

type Farm {
  farmId: ID!
  userId: ID!
  name: String!
  location: Location!
  size: Float!
  unit: Unit!
  description: String
  dateCreated: String!
  crops: [Crop!]!
  livestocks: [Livestock!]!
  weatherData: [WeatherData!]!
  iotDevices: [IoTDevices!]!
}
type Livestock {
  livestockId: ID!
  farmId: ID!
  userId: ID!
  type: String!
  quantity: Int!
  healthStatus: String!
  location: String
  dateCreated: String!
}
type Crop {
  cropId: ID!
  farmId: ID!
  userId: ID!
  type: String!
  stage: CropStage!
  plantingDate: String!
  harvestDate: String
  healthStatus: String!
  dateCreated: String!
}

enum CropStage {
  GERMINATION
  FLOWERING
  HARVEST
}


type Location {
  latitude: Float!
  longitude: Float!
}

enum Unit {
  HECTARES
  ACRES
}
type User {
    userId: ID!
    email: String!
    displayName: String!
    profileImageURL: String
    role: Role!
    dateCreated: String!
    farms: [Farm!]!
  }
  
  enum Role {
    FARMER
    AGRONOMIST
    RESEARCHER
    OTHER
  }
  
  type Query {
    getUser(userId: ID!): User
    getUsers: [User!]!
    getFarm(farmId: ID!): Farm
    getFarms: [Farm!]!
    getFarmsByUserId(userId: ID!): [Farm!]!
    getCrop(cropId: ID!): Crop!
    getCrops: [Crop!]!
    getCropsByFarmId(farmId: ID!): [Crop!]!
    getLivestock(livestockId: ID!): Livestock!
    getAllLivestock: [Livestock!]!
    getLivestockByFarmId(farmId: ID!): [Livestock!]!
    getWeatherData(weatherDataId: ID!): WeatherData!
    getAllWeatherData: [WeatherData!]!
    getWeatherDataByFarmId(farmId: ID!): [WeatherData!]!
    getIoTDevice(deviceId: ID!): IoTDevices!
    getAllIoTDevices: [IoTDevices!]!
    getIoTDevicesByFarmId(farmId: ID!): [IoTDevices!]!
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(userId: ID!, input: UpdateUserInput!): User!
    createFarm(input: CreateFarmInput!): Farm!
    updateFarm(farmId: ID!, input: UpdateFarmInput!): Farm!
    createCrop(input: CropInput!): Crop!
    updateCrop(cropId: ID!, input: CropUpdateInput!): Crop!
    createLivestock(input: LivestockInput!): Livestock!
    updateLivestock(livestockId: ID!, input: LivestockUpdateInput!): Livestock!
    createWeatherData(input: WeatherDataInput!): WeatherData!
    updateWeatherData(weatherDataId: ID!, input: WeatherDataUpdateInput!): WeatherData!
    createIoTDevice(input: IoTDeviceInput!): IoTDevices!
    updateIoTDevice(deviceId: ID!, input: IoTDeviceUpdateInput!): IoTDevices!
  

  }
  
  input IoTDeviceInput {
    userId: ID!
    farmId: ID!
    type: String!
    location: LocationInput!
    data: JSONObject!
  }
  
  input IoTDeviceUpdateInput {
    userId: ID
    farmId: ID
    type: String
    location: LocationInput
    data: JSONObject
  }
  
  input LocationInput {
    latitude: Float!
    longitude: Float!
  }

input WeatherDataInput {
  farmId: ID!
  date: String!
  temperature: Float!
  humidity: Float!
  rainfall: Float!
  windSpeed: Float!
}

input WeatherDataUpdateInput {
  farmId: ID
  date: String
  temperature: Float
  humidity: Float
  rainfall: Float
  windSpeed: Float
}
  
input LivestockInput {
  farmId: ID!
  userId: ID!
  type: String!
  quantity: Int!
  healthStatus: String!
  location: String
}

input LivestockUpdateInput {
  farmId: ID
  userId: ID
  type: String
  quantity: Int
  healthStatus: String
  location: String
}
  input CropInput {
    farmId: ID!
    userId: ID!
    type: String!
    stage: CropStage!
    plantingDate: String!
    harvestDate: String
    healthStatus: String!
  }
  
  input CropUpdateInput {
    farmId: ID
    userId: ID
    type: String
    stage: CropStage
    plantingDate: String
    harvestDate: String
    healthStatus: String
  }
  input CreateUserInput {
    email: String!
    displayName: String!
    profileImageURL: String
    role: Role!
  }
  
  input UpdateUserInput {
    email: String
    displayName: String
    profileImageURL: String
    role: Role
  }

  
  input CreateFarmInput {
    userId: ID!
    name: String!
    location: LocationInput!
    size: Float!
    unit: Unit!
    description: String
  }
  
  input UpdateFarmInput {
    name: String
    location: LocationInput
    size: Float
    unit: Unit
    description: String
  }
  
  input LocationInput {
    latitude: Float!
    longitude: Float!
  }
  
`  

module.exports = typeDefs;
