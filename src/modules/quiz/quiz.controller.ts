import { Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../authorization/roles.decorator';
import { ERole } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @ApiOperation({ summary: 'Quiz' })
  @ApiResponse({ status: 201, description: 'Return Quiz' })
  @ApiResponse({ status: 404, description: 'Can not Quiz' })
  @ApiBearerAuth()
  @Post('')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async quiz() {
    return await this.quizService.tst();
  }
}
