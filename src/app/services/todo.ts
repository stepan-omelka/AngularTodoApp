import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
  Timestamp // Import Timestamp directly from @angular/fire/firestore
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {Todo} from "../models/todo.model";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private collectionName = "todos";

  private readonly firestore = inject(Firestore);

  async createItem(data: Omit<Todo, 'id'>): Promise<void> {
    const itemCollection = collection(this.firestore, this.collectionName);
    await addDoc(itemCollection, data);
  }

  getItems(): Observable<Todo[]> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    return collectionData(itemsCollection, { idField: 'id' }).pipe(
      map((items) =>
        items.map((item) => {
          return this.convertTimestampToDate(item);
        })
      ),
    ) as Observable<Todo[]>;
  }

  getItemById(id: string): Observable<Todo> {
    const itemDoc = doc(this.firestore, this.collectionName + '/' + id);
    return docData(itemDoc, { idField: 'id' }).pipe(
      map(item => this.convertTimestampToDate(item))
    ) as Observable<Todo>;
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
