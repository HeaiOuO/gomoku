import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/common/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {
  allRooms: Observable<string[]>;
  currentRoom: Room = { id: '', chat: '' };
  private _roomSub: Subscription;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.allRooms = this.roomService.allRooms;
    this._roomSub = this.roomService.currentRoom
      .subscribe((room: Room) => {
        console.log(room);
        this.currentRoom = room;
      });
  }

  ngOnDestroy(): void {
    return this._roomSub.unsubscribe();
  }

  loadRoom(id: string) {
    return this.roomService.getRoom(id);
  }

  newRoom() {
    return this.roomService.createRoom();
  }

  isSelected(id: string): Boolean {
    return this.currentRoom.id === id;
  }

}
