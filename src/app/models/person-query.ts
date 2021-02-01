import { ResponseBase } from './response';
import { Person } from './person';

export interface PersonQuery extends ResponseBase {
  message: string;
  isError: boolean;
  result: Person[];
}
