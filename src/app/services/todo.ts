import {inject, Injectable} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
  Timestamp
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {Todo} from "../models/todo.model";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private collectionName = "todos";

  private readonly firestore = inject(Firestore);

  private todos$: Observable<Todo[]> = collectionData(collection(this.firestore, this.collectionName), { idField: 'id' }).pipe(
      map((items) =>
        items.map((item) => {
          return this.convertTimestampToDate(item);
        })
      ),
    ) as Observable<Todo[]>;

  public todos = toSignal(this.todos$, {initialValue: []});

  async createItem(data: Omit<Todo, 'id'>): Promise<void> {
    const itemCollection = collection(this.firestore, this.collectionName);
    await addDoc(itemCollection, data);
  }

  async updateItem(id: string,  data: Partial<Todo>): Promise<void> {
    const itemDoc = doc(this.firestore, this.collectionName + '/' + id);
    await updateDoc(itemDoc, data);
  }

  async deleteItem(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, this.collectionName + '/' + id);
    await deleteDoc(itemDoc);
  }

  private convertTimestampToDate(item: any): Todo {
    const dueDate = item.dueDate;
    return { ...item, dueDate: dueDate instanceof Timestamp ? dueDate.toDate() : dueDate };
  }
}
