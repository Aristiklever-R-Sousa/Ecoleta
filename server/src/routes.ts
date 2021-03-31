import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsControllers';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

// Criando o objeto que trabalhará com as rotas
const routes = express.Router();

const upload = multer(multerConfig);

// CRIANDO O OBJETO itemsController
const itemsController = new ItemsController;

// LISTANDO OS ITEMS
routes.get('/items', itemsController.index);

// CRIANDO O OBJETO pointsController
const pointsController = new PointsController;

// index: usar para listagem
routes.get('/points', pointsController.index);

// show: usar quando for exibir apenas um registro
routes.get('/points/:id', pointsController.show);

// create: usar para criações de registros
// CRIANDO PONTOS DE COLETA
routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);

// update: usar para atualizações de registros
// delete: usar para deletar registros

export default routes;
