import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from '../common/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  currentRoom = this.socket.fromEvent<Room>('room');
  allRooms = this.socket.fromEvent<string[]>('allRooms');
  id = 0;

  constructor(private socket: Socket) { }

  private createId(): string {
    this.id++;
    return `${this.id}`;
  }

  getRoom(id: string) {
    return this.socket.emit('getRoom', id);
  }

  createRoom() {
    return this.socket.emit('addRoom', { id: this.createId(), chat: '' });
  }

  editRoom(room: Room) {
    return this.socket.emit('editRoom', room);
  }

}
