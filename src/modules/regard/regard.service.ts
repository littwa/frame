import { Injectable, NotFoundException } from '@nestjs/common';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import { AddRegardDto, CreateTextDto, ParamIdDto } from 'src/modules/regard/dto/regard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Regard, RegardDocument } from 'src/modules/regard/regard.schema';
import { Model } from 'mongoose';
import { CommonService } from 'src/shared/services/common.service';
import { Text, TextDocument } from 'src/modules/regard/text.schema';

@Injectable()
export class RegardService {
  constructor(
    @InjectModel(Regard.name) public regardModel: Model<RegardDocument>,
    @InjectModel(Text.name) private textModel: Model<TextDocument>,
    private commonService: CommonService,
  ) {}

  async addRegard(body: AddRegardDto, req: IRequestExt) {
    return this.regardModel.create({
      ...body,
      author: req.user.uid,
      created: Date.now(),
    });
  }

  async createTextAndAddToRegard(
    file: Express.Multer.File,
    body: CreateTextDto,
    regardId: string,
  ) {
    // this.textModel.findOne({ content: body.content });

    // const img = await this.commonService.cloudinaryHost(file, 'regard');

    // const text = await this.textModel.create({
    //   ...body,
    //   created: Date.now(),
    //   url: img?.secure_url || '',
    //   public_id: img?.public_id || '',
    // });

    // const text = {_id: 'DELLELELELELELELEbLELELEL!'}
    //
    // const regard = await this.regardModel
    //   .findByIdAndUpdate(
    //     regardId,
    //     {
    //       $push: { list: text._id },
    //     },
    //     { new: true },
    //   )
    //   .populate('text');
    //
    // if (!text) throw new NotFoundException(`Can't updated Regard`);
    //
    // return regard;
  }

  async addTextToRegard(textId: string, regardId: string) {
    // const regard = await this.regardModel
    //   .findByIdAndUpdate(
    //     regardId,
    //     {
    //       $push: { list: textId },
    //     },
    //     { new: true },
    //   )
    //   .populate('text');
    //
    // return regard;
  }

  async delRegard(regardId: string) {
    const deleted = await this.regardModel.findByIdAndDelete(regardId);
    // const screenshot = await this.textModel.deleteMany({ _id: { $in: deleted.screenshots } });

    const regard = await this.textModel.updateMany(
      {
        $in: [], // arr all textId from deleted Regard;
      },
      {
        $pull: { regards: regardId },
      }
    );
  }

  async updateText(file: Express.Multer.File, body, textId: string) {
    // return Promise.resolve(undefined);
  }

  async delTextFromRegard(textId: string, regardId: string) {
    const regard = await this.regardModel.findByIdAndUpdate(
      regardId,
      {
        $pull: { list: textId },
      },
      { new: true },
    );
  }


  async getRegards(req: IRequestExt) {
    const regards = await this.regardModel.find({ author: req.user.uid });
    if (!regards) throw new NotFoundException(`Can't find regard lists`);
    return regards;
  }

  async getRegardAggregated(regardId: string) {
    const regard = await this.regardModel.find({ _id: regardId }).populate('list');
    if (!regard) throw new NotFoundException(`Can't find list`);
    return regard[0];
  }
}
