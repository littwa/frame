import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Regard, RegardDocument } from './regard.schema';
import { Model } from 'mongoose';
import { Text, TextDocument } from './text.schema';
import { CommonService } from '../../shared/services/common.service';

@Injectable()
export class TextService {
  constructor(
    // @InjectModel(Regard.name) public regardModel: Model<RegardDocument>,
    @InjectModel(Text.name) private textModel: Model<TextDocument>,
  ) {}

  async find(body) {
    return this.textModel.findOne({ content: body.content });
  }
}
