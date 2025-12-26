import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TesterAService } from './tester.a.service';

@Injectable()
export class TesterBService {
  constructor(
    @Inject(forwardRef(() => TesterAService))
    private catsService: TesterAService,
  ) {}
}
