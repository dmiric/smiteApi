import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, Render } from '@nestjs/common';
import { GodService } from './god.service';

@Controller('god')
export class GodController {
  constructor(private readonly smiteGodService: GodService) {}
  // test
  @Get()
  async getGods(): Promise<any> {
    const session = await this.smiteGodService.getGods();
    return { session };
  }

}