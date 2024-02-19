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
}
