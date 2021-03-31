import {Request, Response} from 'express';
import knex from '../db/connection';

class PointsController{
    async index(request: Request, response: Response) {
        // cidade, uf, items
        const { city, uf, items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');
        
        const serializedPoints = points.map(point => {
            return {
                ... point,
                image_url: `http://192.168.0.102:3333/uploads/${point.image}`
            };
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const {id} = request.params;
        //const id = request.params.id;

        const point = await knex('points').where('id', id).first();
        
        if (!point)
            return response.status(400).json({message: 'Point not found...'});

        /**
         * SELECT * FROM items
         *    INNER JOIN points_items ON items.id = points_items.item_id
         *    WHERE points_items.point_id = {id}
         */
        
        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title')

        const serializedPoint = {
            ... point,
            image_url: `http://192.168.0.102:3333/uploads/${point.image}`
        };
        
        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        // O recuso acima se chama desestruturação de variável
        // É equivalente a:
        // const name = request.body.name;
        // const email = request.body.email ... (etc)

        // .transaction() vai servir para cancelar a execução das inserções caso uma delas não funcione
        const trx = await knex.transaction();

        // Atribuindo a point os valores para inserção
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        // O que é feito acima se chama short sintaxe
        // Ao invés de escrever, por exemplo, uf: uf,
        // simplesmente escrevemos uf
        // Isso ocorre pois o nome da variável é igual ao nome do objeto

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        // .map() metodo que serve para percorrer um array (nesse caso o items que vem do request.body)
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id
                };
            });
    
        await trx('points_items').insert(pointItems);
        
        // Se todas os inserts funcionaram, ele .commit() realmente executará eles no BD
        await trx.commit();

        return response.json({
            point_id,
            ... point
        });
        // ... é o spread operator (operador de propagação)
        // Faz com objetos/arrays sejam colocados como valores de outros objetos/arrays
    }
}

export default PointsController;
