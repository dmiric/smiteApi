import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { Gods } from './gods.model';
import { SmiteUrlService } from '../smite_api/smiteurl.service';

@Injectable()
export class GodService { 
  
  private gods: Gods[];

  constructor(private httpService: HttpService, private smiteUrlService: SmiteUrlService) { }
  
  async getGods(): Promise<Gods[]> {
    return await this._getGods();
  }
    
  private async _getGods(): Promise<Gods[]> {
    if (!this.gods) {
      this.gods = await this._fetchGods();
    }
    return Promise.resolve(this.gods);
  }

  private async _fetchGods(): Promise<Gods[]> {
    const url: string = await this.getURL();
    return this.httpService.get(url).pipe(
      map(response => response.data)
    ).toPromise();
  }
    
  async getURL(): Promise<string> {
    const baseUrl = this.smiteUrlService.buildUrl('getplayer');
    return baseUrl;
  }

}