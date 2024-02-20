import { Routes } from '@angular/router';
import { BooksComponent } from './page/books/books.component';
import { BorrowersComponent } from './page/borrowers/borrowers.component';

export const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'borrowers',
    component: BorrowersComponent,
  },
];
