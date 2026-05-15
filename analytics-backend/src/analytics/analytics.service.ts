import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  AnalyticsEvent,
  EventDocument,
  EventType,
} from '../schemas/event.schema';

import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(AnalyticsEvent.name)
    private eventModel: Model<EventDocument>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    return this.eventModel.create({
      ...createEventDto,
      timestamp: new Date(),
    });
  }

  async getSessions() {
    return this.eventModel.aggregate([
      {
        $group: {
          _id: '$session_id',
          total_events: { $sum: 1 },
          first_event: { $min: '$timestamp' },
          last_event: { $max: '$timestamp' },
        },
      },
      {
        $sort: {
          last_event: -1,
        },
      },
    ]);
  }

  async getSessionEvents(sessionId: string) {
    return this.eventModel
      .find({ session_id: sessionId })
      .sort({ timestamp: 1 });
  }

  async getHeatmap(pageUrl: string) {
    return this.eventModel.find({
      page_url: pageUrl,
      event_type: EventType.CLICK,
    });
  }
}