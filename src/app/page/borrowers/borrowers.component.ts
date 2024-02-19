import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrowers',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './borrowers.component.html',
  styleUrl: './borrowers.component.css',
})
export class BorrowersComponent implements OnInit {
  private http;
  public borrowerList: any = {};

  constructor(private httpCliant: HttpClient) {
    this.http = httpCliant;
  }

  ngOnInit(): void {
    this.loadBorrowers();
  }

  loadBorrowers() {
    this.http.get('http://localhost:8080/borrower/get').subscribe((data) => {
      this.borrowerList = data;
      console.log(this.borrowerList);
    });
  }
}
