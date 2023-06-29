import { createConnection, Connection } from 'typeorm';
import path from 'path';
require('dotenv').config();

const {  HOST,USER_NAME, PASSWORD, DATABASE, DATABASE_PORT }:any = process.env;

export async function createDatabaseConnection(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    host:HOST,
    port:DATABASE_PORT,
    username:USER_NAME,
    password:PASSWORD,
    database:DATABASE,
    entities: [path.join(__dirname,'../**/*.entity{.ts,.js}')],
    synchronize: true,
  });
}

