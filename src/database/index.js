import Sequelize from "sequelize"
import mongoose from "mongoose"

import User from "../app/models/User"
import configDatabase from "../config/database"
import Products from "../app/models/Product"
import Categories from "../app/models/Categories"

const models = [User, Products, Categories]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/codeburguer",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
