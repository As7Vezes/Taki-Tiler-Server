import { DataSource } from 'typeorm';
import { join } from 'path';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5441,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [join(__dirname, '../entities/*.ts')],
});

export async function connectDatabase(): Promise<boolean> {
    try {
        await appDataSource.initialize();
        console.log('Database connected');
        return true;
      } catch (error) {
        throw new Error("Failed to connected to Database" + error)
      }
}
