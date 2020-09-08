import { FetcherService } from './smite_api/fetcher.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GodController } from './god/god.controller';
import { GodModule } from './god/god.module';
import { GodService } from './god/god.service';
import { PlayerController } from './player/player.controller';
import { PlayerModule } from './player/player.module';
import { PlayerService } from './player/player.service';
import { SmiteapiModule } from './smite_api/smiteapi.module';
import { SmiteSessionService } from './smite_api/smitesession.service';
import { TimestampService } from './smite_api/timestamp.service';
import { SmiteUrlService } from './smite_api/smiteurl.service';

@Module({
  imports: [
    GodModule,
    PlayerModule,
    SmiteapiModule,
    ConfigModule.forRoot()],
  controllers: [
    PlayerController,
    GodController, AppController],
  providers: [
    FetcherService,
    SmiteUrlService,
    TimestampService,
    PlayerService,
    SmiteSessionService,
    GodService, AppService],
})
export class AppModule { }
