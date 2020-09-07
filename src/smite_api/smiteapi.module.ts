import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SmiteSessionService } from './smitesession.service';
import { SmiteUrlService } from './smiteurl.service';
import { TimestampService } from './timestamp.service';
import { FetcherService } from './fetcher.service';

@Module({
    imports: [
        HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
        }), ConfigModule
        ],
    controllers: [],
    providers: [SmiteUrlService, SmiteSessionService, TimestampService, FetcherService],
    exports: [HttpModule, SmiteUrlService, FetcherService]
})
export class SmiteapiModule {


}
