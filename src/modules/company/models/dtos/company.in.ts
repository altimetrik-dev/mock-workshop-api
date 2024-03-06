import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConnectionDTO {
  @ApiProperty()
  @IsString()
  reference: string;
  @IsString()
  @ApiProperty()
  type: string;
}
export class CreateCompanyInDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({ type: [ConnectionDTO] })
  @IsArray()
  connections: ConnectionDTO[];
}
export class FilterCompanyInDTO {
  @ApiProperty()
  @IsString()
  search: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  skip: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  limit: number;
}
