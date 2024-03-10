import { DataSource } from 'typeorm';
import { join } from 'path';
import "dotenv/config"

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5441,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
        console.error("Failed to connected to Database: " + error)
        return false
      }
}
