
const db = require('../../database')

class CategoriesRepository{
    async findAll(){
        const rows = await db.query(`SELECT * FROM categories ORDER BY name`);

        return rows;
    }

    async findById(id){
        const [row] = await db.query(`
            SELECT *
            FROM categories
            Where id = $1
            `,[id])
        return row;
    }

    async create({ name }){
        const [row] = await db.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *
        `, [name])

        return row;
    }

    async update(id, {name}){
        const [row] = await db.query(`
            UPDATE categories
            set name = $1
            WHERE id = $2
            RETURNING *
        `, [name, id]);

        return row;
    }
    async delete(id){
        const [deleteOp] = await db.query(`
                DELETE FROM categories
                where id = $1
        `, [id])

        return deleteOp
    }
}

module.exports = new CategoriesRepository();
