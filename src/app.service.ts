import { Injectable } from '@nestjs/common';
import { CreateTimelinePdfDto } from './dto/createTimelinePdfDto';
const pdf = require("pdf-creator-node");
const fs = require("fs");
const os = require('os');
const path = require('path');

const html = fs.readFileSync(
  __dirname + '/public/templates/milestone-template.html',
  'utf8',
);

@Injectable()
export class AppService {
  createTimelinePdf(createTimelinePdfDto: CreateTimelinePdfDto) {
    const options = {
      orientation: 'landscape',
      border: 'none',
      height: '139mm',
      width: '400mm',
    };

    const tempFilePath = path.join(
      os.tmpdir(),
      `${createTimelinePdfDto.filename}.pdf`,
    );

    const document = {
      html: html,
      data: {
        milestones: createTimelinePdfDto.milestones,
        title: createTimelinePdfDto.title,
        slug: createTimelinePdfDto.filename,
      },
      path: tempFilePath,
    };

    return new Promise<Buffer>((resolve, reject) => {
      pdf
        .create(document, options)
        .then((res) => {
          const pdfBuffer = fs.readFileSync(tempFilePath);
          resolve(pdfBuffer);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}
