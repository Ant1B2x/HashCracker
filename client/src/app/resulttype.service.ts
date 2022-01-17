import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultTypeService {

  static none: string = '';
  static success: string = 'alert-success';
  static warning: string = 'alert-warning';
  static error: string = 'alert-error';

  constructor() { }

}
