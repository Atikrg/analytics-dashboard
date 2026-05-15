import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('events')
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.analyticsService.createEvent(createEventDto);
  }

  @Get('sessions')
  getSessions() {
    return this.analyticsService.getSessions();
  }

  @Get('sessions/:sessionId/events')
  getSessionEvents(@Param('sessionId') sessionId: string) {
    return this.analyticsService.getSessionEvents(sessionId);
  }

  @Get('heatmap')
  getHeatmap(@Query('page_url') pageUrl: string) {
    return this.analyticsService.getHeatmap(pageUrl);
  }
}