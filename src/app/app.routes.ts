import { Routes } from '@angular/router';
import { BooksComponent } from './page/books/books.component';
import { BorrowersComponent } from './page/borrowers/borrowers.component';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'borrowers',
    component: BorrowersComponent,
  },
];
