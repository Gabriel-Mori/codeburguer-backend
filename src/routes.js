import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer"
import authMiddleware from "./app/middlewares/auth"

import UserController from "./app/controllers/UserController"
import SessionController from "./app/controllers/SessionController"
import ProductController from "./app/controllers/ProductController"
import CategoriesController from "./app/controllers/CategoriesController"
import OrderController from "./app/controllers/OrderController"

const upload = multer(multerConfig)

const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/session", SessionController.store)

routes.use(authMiddleware) // todas as rotas abaixo sera chamado a  middleware

routes.post("/products", upload.single("file"), ProductController.store)
routes.put("/products/:id", upload.single("file"), ProductController.update)
routes.get("/products", ProductController.index)

routes.post("/categories", upload.single("file"), CategoriesController.store)
routes.put(
  "/categories/:id",
  upload.single("file"),
  CategoriesController.update
)
routes.get("/categories", CategoriesController.index)

routes.post("/orders", OrderController.store)
routes.put("/orders/:id", OrderController.update)
routes.get("/orders", OrderController.index)

export default routes
