import { ApiProperty } from '@nestjs/swagger';
import { ConnectionDTO } from './company.in';

export class CompanyOutDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [ConnectionDTO] })
  connections: ConnectionDTO[];
}

export class CompanyListOutDTO {
  @ApiProperty()
  skip: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  total: number;
  @ApiProperty({ type: [CompanyOutDTO] })
  data: CompanyOutDTO[];
}
