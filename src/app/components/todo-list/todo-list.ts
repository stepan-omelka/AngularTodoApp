import {Component, inject} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {TodoCreate} from '../todo-create/todo-create';
import {TodoService} from '../../services/todo';

@Component({
  selector: 'app-todo-list',
  imports: [MatIconModule, DatePipe, MatButtonModule, NgClass, MatChipsModule, MatBottomSheetModule, AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly todoService = inject(TodoService);

  readonly todoList$ = this.todoService.getItems();

  markAsCompleted(item: Todo) {
    item.completed = true;
    this.todoService.updateItem(item.id, { completed: true }).then().catch(
      (error) => console.error('Error updating item:', error)
    );
  }

  markAsIncompleted(item: Todo) {
    item.completed = false;
    this.todoService.updateItem(item.id, { completed: false }).then().catch(
      (error) => console.error('Error updating item:', error)
    );
  }

  deleteTodo(item: Todo) {
    this.todoService.deleteItem(item.id).then().catch(
      (error) => console.error('Error deleting item'));

  }

  openAddBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(TodoCreate);
  }
}
