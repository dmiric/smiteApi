import { HttpService, Injectable, forwardRef, Inject } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';

import { Session } from './interfaces/session.model';
import { SmiteUrlService } from './smiteurl.service';

@Injectable()
export class SmiteSessionService { 
  
  private session: Session[];

  constructor(private httpService: HttpService, @Inject(forwardRef(() => SmiteUrlService)) private smiteUrlService: SmiteUrlService) { }
  
  async getSession(): Promise<Session[]> {
    return await this._getSession();
  }

  private async _getSession(): Promise<Session[]> {
    if (!this.session) {
      this.session = await this._fetchSession();
    }
    return Promise.resolve(this.session);
  }

  private async _fetchSession(): Promise<Session[]> {
    const url: string = await this.smiteUrlService.buildUrl('createsession');
    console.log(url);
    //const urlString: string = Promise.resolve(url);
    return this.httpService.get(url).pipe(
      //tap(response => console.log(response)),
      map(response => response.data),
      //tap(response => console.log(response))
    ).toPromise();
    
  }
}
