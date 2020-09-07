import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { SmiteUrlService } from '../smite_api/smiteurl.service';

@Injectable()
export class FetcherService {

constructor(private httpService: HttpService, private smiteUrlService: SmiteUrlService) { }

    async fetch(arg1: string, params: Array<string>): Promise<any> {
        const url: string = await this.getURL(arg1, params);
        return this.httpService.get(url).pipe(
          map(response => response.data)
        ).toPromise();
      }
        
    private async getURL(arg1: string, params: Array<string>): Promise<string> {
        return this.smiteUrlService.buildUrl(arg1, params);
      }
 }
