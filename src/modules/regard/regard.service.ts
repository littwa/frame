import { Injectable, NotFoundException } from '@nestjs/common';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import {
  AddRegardDto,
  TextDto,
  ParamIdDto,
} from 'src/modules/regard/dto/regard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Regard, RegardDocument } from 'src/modules/regard/regard.schema';
import mongoose, { Model } from 'mongoose';
import { CommonService } from 'src/shared/services/common.service';
import { Text, TextDocument } from 'src/modules/regard/text.schema';
import { TextService } from 'src/modules/regard/text.service';
import { Qualify, QualifyDocument } from 'src/modules/regard/qualify.schema';
import { EMediaType } from 'src/shared/enums/media.enum';

@Injectable()
export class RegardService {
  constructor(
    @InjectModel(Regard.name) public regardModel: Model<RegardDocument>,
    @InjectModel(Text.name) private textModel: Model<TextDocument>,
    @InjectModel(Qualify.name) private qualifyModel: Model<QualifyDocument>,
    private commonService: CommonService,
    private textService: TextService,
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
    body: TextDto,
    regardId: string,
    req: IRequestExt
  ) {
    const foundText = await this.textModel.findOne({ content: body.content });

    if (foundText) {
      throw new NotFoundException(`Text with such content is already exist`);
      // const updText = await this.updateText(file, body);
      //
      // return await this.addTextToRegard(updText._id, regardId);
    }

    const pronunciation = await this.commonService.dictionaryApi(body.content);
    const img = await this.commonService.cloudinaryHost(file, 'regard');

    const text = await this.textModel.create({
      ...body,
      regards: [ new mongoose.Types.ObjectId(regardId)] ,
      pronunciation,
      img: img?.secure_url || '',
      public_id: img?.public_id || '',
      created: Date.now(),
      author: req.user.uid,
    });

    return await this.addTextToRegard(text._id, regardId);
  }

  async updateText(file: Express.Multer.File, body: TextDto) {
    const foundText = await this.textModel.findOne({ content: body.content });
    const pronunciation = await this.commonService.dictionaryApi(body.content);
    const img = await this.commonService.cloudinaryHost(file, 'regard');

    if (img && foundText.public_id) {
      await this.commonService.deleteFromCloudinary(
        foundText.public_id,
        EMediaType.Image,
      );
    }

    return this.textModel.findOneAndUpdate(
      { content: body.content },
      {
        ...body,
        pronunciation,
        img: img?.secure_url || '',
        public_id: img?.public_id || '',
      },
      {
        new: true,
      },
    );
  }

  async addTextToRegard(textId: string, regardId: string) {
    const regard = await this.regardModel
      .findByIdAndUpdate(
        regardId,
        {
          $push: { list: textId },
        },
        { new: true },
      )
      .populate('list');

    if (!regard) throw new NotFoundException(`Can't updated Regard`);

    const text = await this.textModel.findByIdAndUpdate(textId, { $push: { regards: regardId } },);

    if (!text) throw new NotFoundException(`Can't updated Text`);

    return regard;
  }

  async delRegard(regardId: string) {
    // Not implement //
    const deleted = await this.regardModel.findByIdAndDelete(regardId);

    return this.textModel.updateMany(
      {
        $in: [], // arr all textId from deleted Regard;
      },
      {
        $pull: { regards: regardId },
      },
    );
  }

  async delTextFromRegard(textId: string, regardId: string, idxText: string) {
    const regard = await this.regardModel.findByIdAndUpdate(regardId).exec();

    const arr = regard.list.splice(Number(idxText), 1);

    if(arr[0].toString() !== textId) throw new NotFoundException(`Can't find del text regard`);

    await regard.save();
    return regard;
  }

  async getRegards(req: IRequestExt) {
    const regards = await this.regardModel.find({ author: req.user.uid });
    if (!regards) throw new NotFoundException(`Can't find regard lists`);
    return regards;
  }

  async getRegardAggregated(regardId: string) {
    const regard = await this.regardModel
      .find({ _id: regardId })
      .populate('list');
    if (!regard) throw new NotFoundException(`Can't find list`);
    return regard[0];
  }

  async createQualify(body: any, regardId: string, req: IRequestExt) {
    const regard = await this.regardModel.findById(regardId);
    const progress = regard.list.reduce((acc, el, i)=> {
      acc['i'+i] = 0;
      return acc;
    }, {})
    console.log(100007, progress);
    // const qualify = await this.qualifyModel.create({...body})
  }
}
