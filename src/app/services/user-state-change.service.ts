import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class UserStateChangeService {
      stateChangesStream = new Subject<string>();

      triggerStateChange(state: string){
          this.stateChangesStream.next(state);
      }
}