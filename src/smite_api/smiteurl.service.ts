import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import md5 = require('md5');

import { SmiteSessionService } from './smitesession.service';
import { TimestampService } from './timestamp.service';
import { exception } from 'console';


@Injectable()
export class SmiteUrlService { 
  
  public apiURL = 'http://api.smitegame.com/smiteapi.svc';
  private developerId: number;
  private authKey: string;

  constructor(
    private timestampService: TimestampService, 
    private configService: ConfigService, 
    @Inject(forwardRef(() => SmiteSessionService)) 
    private smiteSessionService: SmiteSessionService 
    )  {
    this.developerId = this.configService.get('SMITE_DEVELOPER_ID');
    this.authKey = this.configService.get('SMITE_AUTH_KEY');
  }

  private setBaseURLElements(arg1: string): Array<string> {
      const timestamp: string = this.timestampService.getTimestamp();
      const baseUrlParts = [
        this.apiURL,
        arg1 + 'json',
        this.developerId,
        this.getSignature(timestamp, arg1),
        timestamp
      ];
      return baseUrlParts.map(String);
  }

  public async buildUrl(arg1: string, elements?: Array<string>): Promise<string> {
    const urlParts: Array<string> = this.setBaseURLElements(arg1);
    if(elements !== undefined && elements.length > 0)  {
      const session = await this.smiteSessionService.getSession();
      urlParts.splice(4, 0, session['session_id']);
      return urlParts.concat(elements).reduce(this.URLreducer);
    }
    
    return urlParts.reduce(this.URLreducer);
  }

  private URLreducer(accumulator: string|number, currentValue: string|number): string { 
      return accumulator + '/' + currentValue;
  };
  
  public getSignature(timestamp: string, arg1: string): string {
    return md5(this.developerId + arg1 + this.authKey + timestamp);
  }
}
