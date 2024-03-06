import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplePower(watts: number) {
    console.log(`supplying ${watts} worth of power`);
  }
}
