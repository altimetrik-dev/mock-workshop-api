import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { API_PATH } from 'src/modules/core/helpers/api.helper';
import { CreateCompanyInDTO } from '../../models/dtos/company.in';
import { ResponseOutDto } from 'src/modules/core/models/dtos/response-base.out.dto';
import {
  CompanyListOutDTO,
  CompanyOutDTO,
} from '../../models/dtos/company.out';
import { CompanyService } from '../../services/company/company.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller(API_PATH('company'))
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}
  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  async list(
    @Query('search')
    search: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ): Promise<ResponseOutDto<CompanyListOutDTO>> {
    try {
      const data: CompanyListOutDTO = await this.service.findAll(
        search,
        skip,
        limit,
      );
      return {
        success: true,
        data,
      };
    } catch (err) {
      throw err;
    }
  }
  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  async geretrievet(
    @Param('id') id: string,
  ): Promise<ResponseOutDto<CompanyOutDTO>> {
    try {
      const data: CompanyOutDTO = await this.service.findById(id);
      return {
        success: true,
        data,
      };
    } catch (err) {
      throw err;
    }
  }
  @Post()
  @ApiBody({ type: CreateCompanyInDTO })
  async create(
    @Body() params: CreateCompanyInDTO,
  ): Promise<ResponseOutDto<CompanyOutDTO>> {
    try {
      const data: CompanyOutDTO = await this.service.create(params);
      return {
        success: true,
        data,
      };
    } catch (err) {
      throw err;
    }
  }
}
