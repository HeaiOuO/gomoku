import { Component, OnInit, OnDestroy } from '@angular/core';

import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/common/room';

import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  room: Room;
  private _roomSub: Subscription;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this._roomSub = this.roomService.currentRoom.pipe(
      startWith({ id: '', chat: 'Select an existing room or create a new one.'})
    ).subscribe(room => this.room = room);
  }

  ngOnDestroy() {
    this._roomSub.unsubscribe();
  }

  editRoom() {
    this.roomService.editRoom(this.room);
  }

}
