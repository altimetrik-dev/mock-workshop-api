import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseErrorDTO {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  path: string;
}
export class ResponseOutDto<OutDataType> {
  @ApiProperty()
  success: boolean;
  @ApiPropertyOptional({ type: ResponseErrorDTO })
  error?: ResponseErrorDTO;
  @ApiProperty()
  data?: OutDataType;
}
