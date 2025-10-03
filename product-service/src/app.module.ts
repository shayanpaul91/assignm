import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductGrpcController } from './product.grpc.controller';
import { ProductGrpcService } from './product.grpc.service';

@Module({
  imports: [],
  controllers: [AppController, ProductGrpcController],
  providers: [AppService, ProductGrpcService],
})
export class AppModule {}
