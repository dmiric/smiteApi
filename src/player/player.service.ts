import { Injectable } from '@nestjs/common';

import { FetcherService } from '../smite_api/fetcher.service';
import { Player } from './player.model';

@Injectable()
export class PlayerService { 
  
  private player: Player[];

  constructor(private fetcherService: FetcherService) { }
      
  async getPlayer(playerId: string): Promise<string> {
    return await this.fetcherService.fetch('getplayer', [playerId]);
  }

}