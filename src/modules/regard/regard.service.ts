import { Injectable, NotFoundException } from '@nestjs/common';
import { IRequestExt } from 'src/shared/interfaces/auth.interfaces';
import {
  AddRegardDto,
  TextDto,
  ParamIdDto,
  TextDtoFind,
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
    req: IRequestExt,
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
      regards: [], // new mongoose.Types.ObjectId(regardId) // will be added in addTextToRegard;
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
      .findOneAndUpdate(
        {
          $and: [{ _id: regardId }, { list: { $nin: [textId] } }], // findById and except such textId in array 'list'
        },
        {
          $push: { list: textId },
        },
        { new: true },
      )
      .populate('list');

    console.log(10000987, regard);

    if (!regard) throw new NotFoundException(`Can't updated Regard`);

    const text = await this.textModel.findByIdAndUpdate(textId, {
      $push: { regards: regardId },
    });

    if (!text) throw new NotFoundException(`Can't updated Text`);

    // if (regard.qualifies){
    //   this.qualifyModel.updateMany({$in: regard.qualifies}, { progress: { $setOnInsert: { '_': <value1>, ... } } }})
    // }

    return regard;
  }

  async delRegard(regardId: string) {
    const deletedRegard = await this.regardModel.findByIdAndDelete(regardId);

    return this.textModel.updateMany(
      {
        _id: { $in: deletedRegard.list } // arr all textId from deleted Regard;}
      },
      {
        $pull: { regards: regardId },
      },
    );
  }

  async delTextFromRegard(textId: string, regardId: string) {
    const regard = await this.regardModel
      .findByIdAndUpdate(
        regardId,
        {
          $pull: { list: textId },
        },
        { new: true },
      )
      .populate('list');

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
      .populate('list')
      .populate('qualifies');
    if (!regard) throw new NotFoundException(`Can't get regard`);
    return regard[0];
  }

  async createQualify(body: any, regardId: string, req: IRequestExt) {
    const regard = await this.regardModel.findById(regardId).exec();
    const progress = regard.list.reduce((acc, textId, i) => {
      console.log('textId:_', textId);
      acc[`${textId}`] = 0;
      return acc;
    }, {});

    const stat = regard.list.map((v, i) => ({
      textId: v,
      amount: 0,
      checkedAmount: 0, /// ????? not implement
      lapChecked: false,
      finishedInQualify: false,
      obj: { idx: i },
    }));

    const qualify = await this.qualifyModel.create({
      ...body,
      progress,
      stat,
      regard: new mongoose.Types.ObjectId(regardId),
      author: req.user.uid,
      created: Date.now(),
    });

    regard.qualifies.push(qualify._id);
    regard.qualifyInProgress = true;
    regard.qualifyAmount = regard.qualifyAmount + 1;
    await regard.save();

    const texts = await this.textModel.updateMany(
      { _id: { $in: regard.list } },
      {
        $push: {
          qualifies: qualify._id,
        },
      },
    );

    return qualify;
  }

  // async checkQualify(body, { textId, regardId, qualifyId }, req) {
  //   console.log(10002, body, textId, regardId, qualifyId);
  //   const qualify = await this.qualifyModel.findByIdAndUpdate(
  //     qualifyId,
  //     [
  //       {
  //         $set: {
  //           [`progress.${textId}`]: { $add: [`$progress.${textId}`, 1] },
  //         },
  //       },
  //       {
  //         $set: {
  //           stat: {
  //             $map: {
  //               input: '$stat',
  //               as: 'statElement', // if not to define 'as' statElement will be '$$this'
  //               in: {
  //                 $cond: [
  //                   { $eq: ['$$statElement.textId', new mongoose.Types.ObjectId(textId)] }, // if()
  //                   {
  //                     $mergeObjects: [
  //                       '$$statElement',
  //                       { amount: { $sum: ['$$statElement.amount', 1] } }, /// ('$$statElement.amount') + 1
  //                     ],
  //                   }, // true statement
  //                   '$$statElement', // false statement
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       },
  //     ],
  //     {
  //       new: true,
  //     },
  //   );
  //
  //
  //
  //   await this.textModel.findByIdAndUpdate(textId, {
  //     $push: {
  //       statistics: `${qualifyId}_${Date.now()}`
  //     }
  //   });
  //
  //   console.log(1000004, qualify);
  //   return qualify;
  // }

  async checkQualifyExec(body, { textId, regardId, qualifyId }, req) {
    let qualify = await this.qualifyModel.findOne({ _id: qualifyId }).exec();

    qualify.progress[textId] = qualify.progress[textId] + 1;

    let finishedLap: boolean = true;
    let finished: boolean = true;

    qualify.stat = qualify.stat.map((v) => {
      if (v.amount === qualify.repeat && v.textId.toString() === textId)
        throw new NotFoundException(`Can't Check Text(Over amount)`);

      const value =
        v.textId.toString() === textId
          ? {
              ...v,
              lapChecked: true,
              amount: v.amount + 1,
              checkedAmount: v.checkedAmount + 1,
              ...(qualify.repeat === v.amount + 1 && {
                finishedInQualify: true,
              }),
            }
          : v;

      finishedLap = value.lapChecked ? finishedLap : false;
      finished = value.amount === qualify.repeat ? finished : false;

      return value;
    });

    qualify.finishedLap = finishedLap;
    qualify.finished = finished;

    await this.regardModel.findByIdAndUpdate(regardId, {
      $set: {
        qualifyInProgress: !finished,
        // ...(finished && {
        //   qualifyAmount: { $add: [`$qualifyAmount`, 1] },
        // }),
      },
    });

    qualify.markModified('progress');
    qualify.markModified('stat');

    await qualify.save();

    await this.textModel.findByIdAndUpdate(textId, {
      $push: {
        statistics: `${qualifyId}_${Date.now()}`,
      },
    });

    return qualify;
  }

  async resetQualityTextLap({ textId, qualifyId, regardId }) {
    let qualify = await this.qualifyModel.findOne({ _id: qualifyId }).exec();

    qualify.stat = qualify.stat.map((v) => {
      const value =
        v.textId.toString() === textId
          ? {
              ...v,
              amount: 0,
              ...(!qualify.finishedLap && { lapChecked: false }),
              finishedInQualify: false,
            }
          : v;

      return value;
    });

    qualify.markModified('progress');
    qualify.markModified('stat');

    if (qualify.finished) {
      await this.regardModel.findByIdAndUpdate(regardId, {
        $set: {
          qualifyInProgress: true,
          // ...(finished && {
          //   qualifyAmount: { $add: [`$qualifyAmount`, 1] },
          // }),
        },
      });
    }

    qualify.progress[textId] = 0;
    qualify.finished = false;

    await qualify.save();

    return qualify;
  }

  async markAsFinishQualityTextLap({ textId, qualifyId, regardId }) {
    let qualify = await this.qualifyModel.findOne({ _id: qualifyId }).exec();

    // if(qualify.finished) new NotFoundException(`Preceding lap not finished yet`);

    qualify.progress[textId] = qualify.repeat;
    qualify.finishedLap = true;

    let finished: boolean = true;

    qualify.stat = qualify.stat.map((v) => {
      const value =
        v.textId.toString() === textId
          ? {
              ...v,
              amount: qualify.repeat,
              lapChecked: true,
              finishedInQualify: true,
            }
          : v;

      finished = value.amount === qualify.repeat ? finished : false;

      return value;
    });

    await this.regardModel.findByIdAndUpdate(regardId, {
      $set: {
        qualifyInProgress: !finished,
        // ...(finished && {
        //   qualifyAmount: { $add: [`$qualifyAmount`, 1] },
        // }),
      },
    });

    qualify.finished = finished;

    qualify.markModified('progress');
    qualify.markModified('stat');

    await qualify.save();

    return qualify;
  }

  async startNextLap(qualifyId: string) {
    const qualify = await this.qualifyModel.findById(qualifyId).exec();
    if (!qualify.finishedLap)
      throw new NotFoundException(`Preceding lap not finished yet`);

    qualify.stat = qualify.stat.map((v) =>
      !v.finishedInQualify ? { ...v, lapChecked: false } : v,
    );

    qualify.finishedLap = false;

    qualify.markModified('stat');

    await qualify.save();

    return qualify;
  }

  async findTexts(content: string) {
    return this.textModel.find({ content: { $regex: content, $options: "i" } }).limit( 15 );
  }
}
