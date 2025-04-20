import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';

// import { Product } from 'src/modules/products/products.schema';
import { ETesterNum, ETesterSize } from 'src/shared/enums/tester.enum';

export type TesterDocument = Tester & Document;

@Schema()
export class Tester extends Document {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({
        type: String,
        default: 'a',
        enum: ['a', 'b', 'c'],
    })
    status: string;

    @Prop({
        type: String,
        default: 'xxx',
        enum: ['xxx', 'yyy', 'zzz'],
    })
    distinct: string;

    @Prop({
        type: Number,
        default: ETesterNum.One,
        enum: ETesterNum,
    })
    num: ETesterNum;

    @Prop({
        type: String,
        default: ETesterSize.L,
        enum: ETesterSize,
    })
    size: ETesterNum;

    @Prop({ type: Object, default: Date.now() })
    dateCreated: Date;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }] })
    // productsList: Product[];
    //
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    // createByUser: Product[];

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    // customerId: Customer;

    //@Prop({ type: [CustomerSchema] })
    // productsList: ICustomer[]; // Check how it works???
}

export const TesterSchema = SchemaFactory.createForClass(Tester);
