import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<AnalyticsEvent>;

export enum EventType {
  PAGE_VIEW = 'page_view',
  CLICK = 'click',
}

@Schema({
  timestamps: true,
})
export class AnalyticsEvent {
  @Prop({
    required: true,
    index: true,
  })
  session_id!: string;

  @Prop({
    required: true,
    enum: EventType,
    index: true,
  })
  event_type!: EventType;

  @Prop({
    required: true,
    index: true,
  })
  page_url!: string;

  @Prop({
    required: true,
    default: Date.now,
  })
  timestamp!: Date;

  @Prop()
  x?: number;

  @Prop()
  y?: number;

  @Prop()
  user_agent?: string;

  @Prop()
  ip_address?: string;
}

export const AnalyticsEventSchema =
  SchemaFactory.createForClass(AnalyticsEvent);

// indexes for performance
AnalyticsEventSchema.index({
  session_id: 1,
  timestamp: 1,
});

AnalyticsEventSchema.index({
  page_url: 1,
  event_type: 1,
});