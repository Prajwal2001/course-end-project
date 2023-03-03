import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventEmitter = new Subject<any>();

  constructor() { }
}
