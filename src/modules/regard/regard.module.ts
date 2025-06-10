import { Module } from '@nestjs/common';
import { RegardService } from 'src/modules/regard/regard.service';
import { RegardController } from 'src/modules/regard/regard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Regard, RegardSchema } from 'src/modules/regard/regard.schema';
import { Text, TextSchema } from 'src/modules/regard/text.schema';
import { CommonService } from 'src/shared/services/common.service';
import { TextService } from 'src/modules/regard/text.service';
import { Qualify, QualifySchema } from 'src/modules/regard/qualify.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Regard.name, schema: RegardSchema },
    { name: Text.name, schema: TextSchema },
    {name: Qualify.name, schema: QualifySchema }
  ])],
  providers: [RegardService, CommonService, TextService], // TextService,
  controllers: [RegardController],
  // exports: [RegardService, TextService]
})
export class RegardModule {}
