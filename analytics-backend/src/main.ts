import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  });

  const PORT = process.env.PORT as string || 3000;
  await app.listen(PORT);

  console.log(`Backend is running at port ${PORT}`);
}
bootstrap();