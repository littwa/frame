import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from 'src/modules/quiz/quiz.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/authorization/roles.decorator';
import { ERole } from 'src/shared/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IQuizMathGenerateParamsDto } from 'src/modules/quiz/dto/quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @ApiOperation({ summary: 'Auto Generate Math Quiz' })
  @ApiResponse({ status: 201, description: 'Return Auto Generate Math Quiz' })
  @ApiResponse({ status: 404, description: 'Can not return Auto Generate Math Quiz' })
  @ApiBearerAuth()
  @Post('generate-math-auto')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async autoGenerateMathQuiz(@Body() body: IQuizMathGenerateParamsDto) {
    return this.quizService.autoGenerateMathQuiz(body);
  }

  @ApiOperation({ summary: 'Quiz Test' })
  @ApiResponse({ status: 201, description: 'Return Quiz Test' })
  @ApiResponse({ status: 404, description: 'Can not Quiz Test' })
  @ApiBearerAuth()
  @Post('test')
  @Roles([ERole.Admin, ERole.Customer])
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async quiz() {
    return await this.quizService.tst();
  }
}
