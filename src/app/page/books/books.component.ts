import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  private http;
  public bookList: any = {};
  public selectedBook: any;

  constructor(private httpCliant: HttpClient) {
    this.http = httpCliant;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get('http://localhost:8080/book/get').subscribe((data) => {
      this.bookList = data;
      console.log(this.bookList);
    });
  }

  deleteBook() {
    let api = 'http://localhost:8080/book/' + this.selectedBook.id;
    this.http
      .delete(api, { responseType: 'text' })
      .subscribe((responce: string) => {
        console.log(responce);
        this.loadBooks();
        this.selectedBook = null;
      });
  }

  setSelectedBook(book: any) {
    this.selectedBook = book;
    console.log('Set Selected Book' + book.id);
  }

  saveBook() {
    let postApi = 'http://localhost:8080/book/add';
    this.http.post(postApi, this.selectedBook).subscribe((data) => {
      console.log('saved!');
      this.loadBooks();
      this.selectedBook = [];
    });
  }
}
