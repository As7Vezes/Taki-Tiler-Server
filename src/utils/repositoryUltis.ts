import { appDataSource, appDataSourceTest } from "../db/data-source";

export const getRepositoryByEnvironment = (environment: string, entity: any) => {
    let repo;
  
    if (environment === 'test') {
      repo = appDataSourceTest.getRepository(entity);
    } else if (environment === 'development') {
      repo = appDataSource.getRepository(entity);
    }
  
    return repo;
}
  