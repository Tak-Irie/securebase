import { getCustomRepository } from 'typeorm';
import { RegisterUserUseCase } from './RegisterUserUseCase';
import { TypeOrmUserRepository } from '../../infrastructure/TypeOrmUserRepository';

const OrmUserRepository = getCustomRepository(TypeOrmUserRepository);
export const registerUserUseCase = new RegisterUserUseCase(OrmUserRepository);
