import { BadRequestException, NotFoundException } from '@nestjs/common';

export const GENERAL_RESPONSE = {
  LOCATION_NOT_FOUND: {
    status: 'LOCATION_NOT_FOUND',
    message: 'Location not found',
  },
  FAILED_CREATE_LOCATION: {
    status: 'FAILED_CREATE_LOCATION',
    message: 'Location create failed',
  },
  FAILED_UPDATE_LOCATION: {
    status: 'FAILED_UPDATE_LOCATION',
    message: 'Location update failed',
  },
  FAILED_DELETE_LOCATION: {
    status: 'FAILED_DELETE_LOCATION',
    message: 'Location delete failed',
  },
};

export class LocationNotFoundException extends NotFoundException {
  constructor() {
    super(GENERAL_RESPONSE.LOCATION_NOT_FOUND);
  }
}

export class FailedCreateLocationException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_CREATE_LOCATION);
  }
}

export class FailedUpdateLocationException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_UPDATE_LOCATION);
  }
}

export class FailedDeleteLocationException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_DELETE_LOCATION);
  }
}
