import { Request, Response, Router } from "express"
import ProductController from "@/controllers/product.controller"
import usersController from "@/controllers/users.controller"
import { validarToken } from "@/middleware/auth"

const routes = Router()

routes.post('/api/login', usersController.login)

routes.post('/api/users', validarToken, usersController.create);
routes.post('/api/products', validarToken, ProductController.create);
routes.get('/api/products', validarToken, ProductController.findAll);
routes.get('/api/products/:id', validarToken, ProductController.findOne);
routes.put('/api/products/:id', validarToken, ProductController.update);
routes.delete('/api/products/:id', validarToken, ProductController.delete);

routes.get('/', (_: Request, response: Response) => {
    response.status(200).send({
        success: true
    })
})

routes.get("*", (_: Request, response: Response) => {
    response.status(404).send({
        error: "Rota não encontrada."
    })
})

export default routes