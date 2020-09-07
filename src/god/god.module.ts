import { SmiteapiModule } from './../smite_api/smiteapi.module';
import { GodService } from './god.service';
import { Module } from '@nestjs/common';


@Module({
    imports: [SmiteapiModule],
    controllers: [],
    providers: [GodService],
})
export class GodModule { }
