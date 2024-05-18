import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TesterBService } from './tester.b.service';

@Injectable()
export class TesterAService {
    constructor(
        @Inject(forwardRef(() => TesterBService))
        private commonService: TesterBService,
    ) {}
}
