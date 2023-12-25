import { IsString, MinLength } from "class-validator";

export class CreateTimelinePdfDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    filename: string;
    milestones: MilestonePdfDto[];
}

export class MilestonePdfDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(9)
    date: string;

    icon: string;
}