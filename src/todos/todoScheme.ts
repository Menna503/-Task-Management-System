import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type TodoDocument=Todo&Document;
@Schema()
export class Todo{
    @Prop()
    title:string;
    @Prop()
    description:string;
}
export const TodoSchema=SchemaFactory.createForClass(Todo);