import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AlumnoModule } from './alumno/alumno.module';
import { AlumnoController } from './alumno/alumno.controller';

@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb://localhost/products-nest-tutorial'), AlumnoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
