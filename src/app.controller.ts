import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateTimelinePdfDto } from './dto/createTimelinePdfDto';

@Controller('timeline-pdf')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async createTimelinePdf(
    @Body() createTimelinePdfDto: CreateTimelinePdfDto,
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer =
        await this.appService.createTimelinePdf(createTimelinePdfDto);
      //Considerar que es un byte array
      // res.setHeader('Content-Type', 'application/pdf');
      res.send({
        message: 'El PDF se descargó correctamente',
        pdf: pdfBuffer,
      });
    } catch (error) {
      res.status(500).send('Error no controlado del sistema');
    }
  }
}
