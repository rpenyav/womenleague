import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partido } from './partido.schema';

@Injectable()
export class PartidoService {
  constructor(
    @InjectModel(Partido.name) private partidoModel: Model<Partido>,
  ) {}

  async findAll(): Promise<Partido[]> {
    return this.partidoModel.find().exec();
  }

  async findOne(id: string): Promise<Partido> {
    return this.partidoModel.findById(id).exec();
  }

  async create(createPartidoDto: any): Promise<Partido> {
    const createdPartido = new this.partidoModel(createPartidoDto);
    return createdPartido.save();
  }

  async update(id: string, updatePartidoDto: any): Promise<Partido> {
    return this.partidoModel.findByIdAndUpdate(id, updatePartidoDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return this.partidoModel.findByIdAndDelete(id);
  }
}
