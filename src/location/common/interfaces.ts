import { Location } from '../entities/location.entity';

export interface PAGINATION {
  results: Location[];
  total: number;
  page: number;
  totalPages: number;
}
