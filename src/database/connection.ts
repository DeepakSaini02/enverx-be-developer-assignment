import { createConnection, Connection } from 'typeorm';
import path from 'path';
import config from '../configs/development.json';

const { host, username, password, database, port } = config['dbConfig'];

export async function createDatabaseConnection(): Promise<Connection> {
  return await createConnection({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [path.join(__dirname,'../**/*.entity{.ts,.js}')],
    synchronize: true,
  });
}

