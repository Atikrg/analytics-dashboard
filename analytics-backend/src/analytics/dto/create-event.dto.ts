import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum EventType {
  PAGE_VIEW = 'page_view',
  CLICK = 'click',
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  session_id!: string;

  @IsEnum(EventType)
  event_type!: EventType;

  @IsString()
  @IsNotEmpty()
  page_url!: string;

  @IsOptional()
  @IsNumber()
  x?: number;

  @IsOptional()
  @IsNumber()
  y?: number;
}