import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export declare const getMongoDBConfig: (configService: ConfigService) => Promise<TypegooseModuleOptions>;
