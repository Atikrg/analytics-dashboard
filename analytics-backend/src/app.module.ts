import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from './analytics/analytics.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      process.env.NEST_MONGODB_URI!,

      {
        onConnectionCreate: (connection) => {
          console.log('🔥 Creating MongoDB connection...');

          connection.on('connected', () => {
            console.log('✅ MongoDB connected');
          });

          connection.on('error', (error) => {
            console.log('❌ MongoDB error:', error);
          });

          connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
          });

          return connection;
        },
      },
    ),

    AnalyticsModule,
  ],
})
export class AppModule { }