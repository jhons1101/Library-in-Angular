import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { BookService } from '../../../services/book.service';
import { Report } from 'notiflix';

@Component({
  selector: 'app-list',
  templateUrl: './listBook.component.html',
  styleUrls: ['./listBook.component.sass']
})
export class ListComponent implements OnInit {

  books: any[] = [];

  constructor(
    private _bookService: BookService
  ) {

  }

  ngOnInit(): void {
    this.getBooks();
  }

  /**
   * @func getBooks()
   * @desc Obtiene ellistado de libros de firebase books_collection
   */
  getBooks() {
    this._bookService.getBooksService().subscribe(data => {

      this.books = [];

      data.forEach((element:any) => {
        this.books.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  /**
   * @func deleteBook()
   * @desc Elimina un registro de libro en firebase books_collection
   * @param id
   */
  deleteBook(id: string) {
    this._bookService.deleteBookService(id).then(() => {
      Report.success( 'Éxito', 'Libro eliminado correctamente', 'Aceptar');
    }).catch(err => {
      Report.failure( 'Error', err, 'Aceptar' );
    });
  }

}
