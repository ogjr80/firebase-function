const { gql } = require("graphql-tag");

const typeDefs = gql`

"""
 User Types Definitions
"""
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

"""
Farmer Type Definitions 
"""
type Farm {
    farmId: ID!
    userId: ID!
    user: User!
    name: String!
    location: Location!
    size: Float!
    unit: Unit!
    description: String
    dateCreated: String!
    crops: [Crop!]!
    livestocks: [Livestock!]!
    weatherData: [WeatherData!]!
  }
  enum Unit {
    HECTARES
    ACRES
  }
  
  type Location {
    latitude: Float!
    longitude: Float!
  }
""" CROP Type """ 
type Crop {
    cropId: ID!
    farm: Farm!
    user: User!
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
  """Livestock Types """ 
  type Livestock {
    livestockId: ID!
    farmId: ID! 
    userId: ID!
    farm: Farm!
    user: User!
    type: String!
    quantity: Int!
    healthStatus: String!
    location: String
    dateCreated: String!
  }
  
  """ WeatherData Types """ 
  type WeatherData {
    weatherDataId: ID!
    userId: ID!
    farmId: ID!
    farm: Farm!
    date: String!
    temperature: Float!
    humidity: Float!
    rainfall: Float!
    windSpeed: Float!
  }




type Query { 
    """ User query """
    getUser(userId: ID!): User
    getUsers: [User!]!

    """Farm Query Definition """ 
    getFarm(farmId: ID!): Farm
    getFarms: [Farm!]!
    getFarmsByUserId(userId: ID!): [Farm!]!

    """CROP Query Definition """ 
    getCrop(cropId: ID!): Crop!
    getCrops: [Crop!]!

    """Livestock Query Definition """ 
    getLivestock(livestockId: ID!): Livestock!
    getAllLivestock: [Livestock!]!

    """ WeatherData Query Definitions """ 
    getAllWeatherData: [WeatherData!]!
    getWeatherData(weatherDataId: ID!): WeatherData!
    getWeatherDataByFarmId(farmId: ID!): [WeatherData!]!

   
}

type Mutation { 
    """  User Mutation""" 
    createUser(input: CreateUserInput!): User!
    updateUser(userId: ID!, input: UpdateUserInput!): User!

    """ Farm Mutations """
    createFarm(input: CreateFarmInput!): Farm!
    updateFarm(farmId: ID!, input: UpdateFarmInput!): Farm!

    """ CROP Mutation """
    createCrop(input: CropInput!): Crop!
    updateCrop(cropId: ID!, input: CropUpdateInput!): Crop!
    deleteCrop(cropId:ID!): Crop!

    """ Livestock Mutation """ 
    createLivestock(input: LivestockInput!): Livestock!
    updateLivestock(livestockId: ID!, input: LivestockUpdateInput!): Livestock!
    deleteLivestock(livestockId: ID!): Livestock!

    """ WeatherData Mutation """ 
    createWeatherData(input: WeatherDataInput!): WeatherData!
    updateWeatherData(weatherDataId: ID!, input: WeatherDataUpdateInput!): WeatherData!

  
}

""" User Inputs """
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

""" Farm Inputs """ 
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

 """ CROP Inputs """ 
 
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

    """ Livestock Inputs """ 
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

      """ WeatherData Inputs """ 
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
      
`
module.exports = typeDefs; 

