import * as Yup from "yup"
import Categories from "../models/Categories"
import User from "../models/User"
import { where } from "sequelize"

class CategoriesController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json({ error: "not authorized, admin only" })
    }

    const { name } = request.body

    const { filename: path } = request.file

    const categoryExists = await Categories.findOne({
      where: { name },
    })

    if (categoryExists) {
      return response.status(400).json({ error: "Category already exists" })
    }

    const { id } = await Categories.create({
      name,
      path,
    })

    return response.json({ name, id })
  }

  async index(request, response) {
    const category = await Categories.findAll()
    return response.json(category)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json({ error: "not authorized, admin only" })
    }

    const { name } = request.body

    const { id } = request.params

    const category = await Categories.findByPk(id)
    if (!category) {
      return response
        .status(400)
        .json({ error: "Make sure your category ID is correct" })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    await Categories.update({ name, path }, { where: { id } })

    return response.status(200).json()
  }
}

export default new CategoriesController()
