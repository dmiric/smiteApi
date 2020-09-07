import { Module } from '@nestjs/common';

import { SmiteapiModule } from './../smite_api/smiteapi.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';


@Module({
    imports: [SmiteapiModule],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule { }
