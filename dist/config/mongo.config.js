"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoDBConfig = void 0;
const getMongoDBConfig = async (configService) => ({
    uri: configService.get('MONGO_URI'),
});
exports.getMongoDBConfig = getMongoDBConfig;
//# sourceMappingURL=mongo.config.js.map