import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * @func addBookService()
   * @desc Servicio para añadir un nuevo libro a la book_collection
   * @param objBook
   * @returns
   */
  addBookService(objBook: any): Promise<any> {
    return this.firestore.collection('books_collection').add(objBook);
  }

  /**
   * @func getBooksService()
   * @desc Consulta todos los registros de la book_collection ordenadas por año de publicación
   * @returns
   */
  getBooksService(): Observable<any> {
    return this.firestore.collection('books_collection', ref => ref.orderBy('yearPublication', 'asc')).snapshotChanges();
  }

  /**
   * @func deleteBookService()
   * @desc Elimina un registro en la book_collection
   * @param id
   * @returns
   */
  deleteBookService(id: string): Promise<any> {
    return this.firestore.collection('books_collection').doc(id).delete();
  }

  /**
   * @func getBookService()
   * @desc consulta los datos de un registro en la book_collection
   * @param id
   * @returns
   */
  getBookService(id: string): Observable<any> {
    return this.firestore.collection('books_collection').doc(id).snapshotChanges();
  }

  /**
   * @func updateBook()
   * @desc actualiza un registro en la book_collection
   * @param id
   * @param data
   * @returns
   */
  updateBook(id: string, data: any): Promise<any> {
    return this.firestore.collection('books_collection').doc(id).update(data);
  }
}
