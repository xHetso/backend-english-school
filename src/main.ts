import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	// Обновленная настройка CORS
	app.enableCors({
		origin: 'https://frontend-english-school-1prn-gd1lau943-xhetsos-projects.vercel.app', // или использовать true для разрешения всех источников
		credentials: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Accept, Authorization', // Добавить Authorization
	})

	await app.listen(4000)
}
bootstrap()
