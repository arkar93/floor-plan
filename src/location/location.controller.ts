import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { IdToBodyInterceptor } from 'src/interceptor/id-to-body-interceptor';
import { SUCCESS_RESPONSE } from 'src/location/common/success-response';
import { QueryDto } from './dto/get-query-dto';
import { CheckIsNumber } from './dto/rules/is-num-rule';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    await this.locationService.create(createLocationDto);
    return SUCCESS_RESPONSE.SUCCESS_CREATE_LOCATION;
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.locationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', CheckIsNumber) id: number) {
    return this.locationService.findOne({ id: id });
  }

  @Patch(':id')
  @UseInterceptors(IdToBodyInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    await this.locationService.update(+id, updateLocationDto);
    return SUCCESS_RESPONSE.SUCCESS_UPDATE_LOCATION;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.locationService.remove(+id);
    return SUCCESS_RESPONSE.SUCCESS_DELETE_LOCATION;
  }
}
