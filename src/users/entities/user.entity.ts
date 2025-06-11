import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type userDocoument=User&Document
@Schema()
export class User {
@Prop({required:true})
name:string
@Prop({required:true,unique:true})
email:string
@Prop({required:true})
password:string
@Prop({ default: 'user' }) 
  role: 'user' | 'admin';


}
export const userSchema=SchemaFactory.createForClass(User);

