import {Component, inject} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe, NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {TodoCreate} from '../todo-create/todo-create';

@Component({
  selector: 'app-todo-list',
  imports: [MatIconModule, DatePipe, MatButtonModule, NgClass, MatChipsModule, MatBottomSheetModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private readonly _bottomSheet = inject(MatBottomSheet);

  todoList: Todo[] = [
    {
      title: "Book flight for summer vacation",
      completed: false,
      dueDate: new Date("2025-05-20T00:00:00Z"),
      priority: "High",
    },
    {
      title: "Go grocery shopping (milk, eggs, bread)",
      completed: true,
      dueDate: new Date("2025-11-10T00:00:00Z"),
      priority: "Medium",
    },
    {
      title: "Review Q3 financial reports",
      completed: false,
      dueDate: new Date("2025-11-15T00:00:00Z"),
      priority: "High",
    },
    {
      title: "Water the houseplants",
      completed: false,
      dueDate: new Date("2025-11-12T00:00:00Z"),
      priority: "Low",
    },
    {
      title: "Call dentist to schedule checkup",
      completed: false,
      dueDate: new Date("2025-12-01T00:00:00Z"),
      priority: "Medium",
    },
    {
      title: "Read Chapter 4 of 'The Great Gatsby'",
      completed: true,
      dueDate: new Date("2025-11-05T00:00:00Z"),
      priority: "Low",
    },
  ];

  markAsCompleted(item: Todo) {
    item.completed = true;
    // save the todo item in firestore
  }

  markAsIncompleted(item: Todo) {
    item.completed = false;
  }

  deleteTodo(item: Todo) {
    // delete item from firestore
  }

  addNewTodo() {
    // todo
  }

  openAddBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(TodoCreate);
  }
}
