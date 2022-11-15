import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'notiflix';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-show',
  templateUrl: './showBook.component.html',
  styleUrls: ['./showBook.component.sass']
})
export class ShowComponent implements OnInit {

  isValidFormBook: any;
  formBook : FormGroup;
  idBook: string | null;
  accionPage: string = 'Agregar';
  obj: any;

  constructor(
    private formBuilder: FormBuilder,
    private _bookService: BookService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {

    // se cxrea el objeto Book y sus validaciones de formulario
    this.formBook = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      editorial: ['', [Validators.required, Validators.maxLength(50)]],
      numpages: ['', [Validators.required, Validators.max(9999)]],
      language: ['', Validators.required],
      yearPublication: ['', [Validators.required, Validators.max(9999)]],
    });

    // se captura el id si viene desde el modo edición
    this.idBook =  this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isValidFormBook = true;
    this.isModeEdit();
  }


  processBook() {
    if (this.formBook.invalid) {
      this.isValidFormBook = false;
      return;
    }
    this.isValidFormBook = true;

    if (this.idBook == null) {
      this.addBook();
    } else {
      this.editBook(this.idBook);
    }
  }


  /**
   *
   * @returns
   *
   */
  addBook() {

    const objBook : any = {
      name: this.formBook.value.name,
      author: this.formBook.value.author,
      editorial: this.formBook.value.editorial,
      numpages: this.formBook.value.numpages,
      language: this.formBook.value.language,
      yearPublication: this.formBook.value.yearPublication,
      createDate: new Date(),
      ModifyDate: new Date()
    }

    this._bookService.addBookService(objBook).then(() => {
      Report.success( 'Éxito', 'Libro guardado correctamente', 'Aceptar',
        () => {
          this.router.navigate(['/libro/list']);
        }
      );

    }).catch(err => {
      Report.failure( 'Error', err, 'Aceptar' );
    });
  }


  /**
   * @func
   * @desc
   * @param id
   */
  editBook(id: string) {

    const objBook : any = {
      name: this.formBook.value.name,
      author: this.formBook.value.author,
      editorial: this.formBook.value.editorial,
      numpages: this.formBook.value.numpages,
      language: this.formBook.value.language,
      yearPublication: this.formBook.value.yearPublication,
      ModifyDate: new Date()
    }

    this._bookService.updateBook(id, objBook).then(() => {
      Report.success( 'Éxito', 'Libro actualizado correctamente', 'Aceptar',
        () => {
          this.router.navigate(['/libro/list']);
        }
      );
    }).catch(err => {
      Report.failure( 'Error', err, 'Aceptar' );
    });
  }


  /**
   *
   * @param campo
   * @returns
   */
  fieldRequired(campo: string){
    return this.formBook.controls[campo].errors;
  }


  /**
   * @func isModeEdit()
   * @desc Valida si viene desde 'editar libro' en pantalla de 'lista de libros'
   *       y llena el formulario con los valores del registro
   */
  isModeEdit() {

    if (this.idBook != null) {

      // se cambia el label de la pantalla cuando es modo edición
      this.accionPage = 'Editar';

      this._bookService.getBookService(this.idBook).subscribe(data => {

        this.obj = data.payload.data();

        this.formBook.setValue({
          name: this.obj['name'],
          author: this.obj['author'],
          editorial: this.obj['editorial'],
          numpages: this.obj['numpages'],
          language: this.obj['language'],
          yearPublication: this.obj['yearPublication'],
        })
      })
    }
  }
}
