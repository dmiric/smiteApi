import { Injectable } from '@nestjs/common';
import moment = require('moment');

@Injectable()
export class TimestampService {
    public getTimestamp(): string {
       return moment().utc().format("YYYYMMDDHHmmss");
    }
}
