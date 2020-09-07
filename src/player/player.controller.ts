import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly smitePlayerService: PlayerService) {}

  @Get(':id')
  async getPlayer(@Param('id', new ParseIntPipe()) id: string ): Promise<any> {
    const player = await this.smitePlayerService.getPlayer(id);
    return { player };
  }

}