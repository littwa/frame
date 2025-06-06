import { Module } from '@nestjs/common';
import { RegardService } from './regard.service';
import { RegardController } from './regard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Regard, RegardSchema } from 'src/modules/regard/regard.schema';
import { Text, TextSchema } from 'src/modules/regard/text.schema';
import { CommonService } from 'src/shared/services/common.service';
import { TextService } from './text.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Regard.name, schema: RegardSchema },
    { name: Text.name, schema: TextSchema }
  ])],
  providers: [RegardService, CommonService], // TextService,
  controllers: [RegardController],
  // exports: [RegardService, TextService]
})
export class RegardModule {}
