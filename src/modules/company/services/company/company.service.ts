import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Company } from 'src/modules/database/models/schemas/company.schema';
import { CreateCompanyInDTO } from '../../models/dtos/company.in';
import {
  CompanyListOutDTO,
  CompanyOutDTO,
} from '../../models/dtos/company.out';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private model: Model<Company>) {}
  async create(createCatDto: CreateCompanyInDTO): Promise<CompanyOutDTO> {
    const doc = new this.model(createCatDto);
    const data = await doc.save();
    return this.map(data);
  }

  async findAll(
    search?: string,
    skip = 0,
    limit = 50,
  ): Promise<CompanyListOutDTO> {
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: 'i' } };
    }
    const data = await this.model
      .find(query)
      .skip(skip || 0)
      .limit(limit || 10)
      .exec();
    const total = await this.model.find(query).countDocuments().exec();
    return {
      skip,
      limit,
      total,
      data: data.map((d) => this.map(d)),
    };
  }

  async findById(id: string): Promise<CompanyOutDTO> {
    const data = await this.model.findById(id).exec();
    return this.map(data);
  }

  map(data: Document<unknown, any, Company>): CompanyOutDTO {
    return { id: data.id, ...data.toObject() } as CompanyOutDTO;
  }
}
