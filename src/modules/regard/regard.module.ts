import { Module } from '@nestjs/common';
import { RegardService } from './regard.service';
import { RegardController } from './regard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Regard, RegardSchema } from './regard.schema';
import { Text, TextSchema } from './text.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Regard.name, schema: RegardSchema },
    { name: Text.name, schema: TextSchema }
  ])],
  providers: [RegardService],
  controllers: [RegardController]
})
export class RegardModule {}
