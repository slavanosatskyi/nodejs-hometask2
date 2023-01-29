import { Sequelize } from 'sequelize';

let sequelize: Sequelize | null = null;

export function getSequelize() {
    if (!sequelize) {
        sequelize = new Sequelize(process.env.DATABASE_URI, {
            dialect: 'postgres'
        });
    }

    return sequelize;
}
