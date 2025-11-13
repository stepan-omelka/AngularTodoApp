import {Component, inject} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-todo-create',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, MatButton],
  templateUrl: './todo-create.html',
  styleUrl: './todo-create.css',
})
export class TodoCreate {
  private readonly _bottomSheetRef =
    inject<MatBottomSheetRef<TodoCreate>>(MatBottomSheetRef);

  todoForm!: FormGroup;

  constructor() {
    this.initForm();
  }

  initForm() {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      dueDate: new FormControl(new Date(), Validators.required),
      priority: new FormControl('High', Validators.required),
    })
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    console.warn(this.todoForm.value)
    // post data to firestore

    this._bottomSheetRef.dismiss();
  }

}
