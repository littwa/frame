import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tester, TesterDocument } from './tester.schema';
import { TesterAService } from './tester.a.service';
import { TesterBService } from './tester.b.service';
import { IRequestExt } from '../../shared/interfaces/auth.interfaces';

@Injectable()
export class TesterService {
  constructor(
    @InjectModel(Tester.name) private testerModel: Model<TesterDocument>,
    private testerAService: TesterAService,
    private testerBService: TesterBService,
  ) {}

  getTester = async () => {
    // const allProducts = await this.productModel.find();
    // if (!allProducts) throw new NotFoundException(`Can't get Products`);
    return null;
  };

  async createTester(param, query, body, req: IRequestExt) {
    const newTester = await this.testerModel.create({ ...body, createByUser: req.user.uid });
    if (!newTester) throw new NotFoundException(`Can't create Tester`);
    console.log('newTester=', newTester);
    return newTester;
  }

  executeTester = async (param, query, body, req: IRequestExt) => {
    // const updatedProduct = await this.testerModel.findByIdAndUpdate(
    //   productId,
    //   {
    //     $set: createProductDto,
    //   },
    //   {
    //     new: true,
    //     useFindAndModify: false,
    //   },
    //   );
    // return !updatedProduct
    //   ? new NotFoundException(`Can't update Product id: ${productId}`)
    //   : updatedProduct;
  };
  //
  // deleteProduct = async (productId) => {
  //   const deletedProduct = await this.productModel.findByIdAndDelete(productId);
  //   if (!deletedProduct) throw new NotFoundException(`Can't del Product`);
  //
  //   console.log('deletedProduct', deletedProduct, productId);
  //   return `Product ById: ${productId} has been deleted!`;
  // };
}
