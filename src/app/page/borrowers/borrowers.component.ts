import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  public selectedBorrower: any;
  public newBorrower: any = {};

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

  deleteBorrower() {
    let api = 'http://localhost:8080/borrower/' + this.selectedBorrower.bid;
    this.http
      .delete(api, { responseType: 'text' })
      .subscribe((responce: string) => {
        console.log(responce);
        this.loadBorrowers();
        Swal.fire({
          title: 'Borrower Deleted!',
          text: `The borrower '${this.selectedBorrower.name}' has been successfully deleted.`,
          icon: 'success',
        });
        this.selectedBorrower = null;
      });
  }

  setSelectedBorrower(borrower: any) {
    this.selectedBorrower = borrower;
    console.log('Set Selected Borrower' + borrower.bid);
  }

  saveBorrower() {
    let postApi = 'http://localhost:8080/borrower/add';
    this.http.post(postApi, this.selectedBorrower).subscribe((data) => {
      console.log('saved!');
      this.loadBorrowers();
      Swal.fire({
        title: 'Borrower Updated!',
        text: `The borrower '${this.selectedBorrower.name}' has been successfully updated.`,
        icon: 'success',
      });
      this.selectedBorrower = [];
    });
  }

  addNewBorrower() {
    this.newBorrower = {};
  }

  saveNewBorrower() {
    if (
      !this.newBorrower.name ||
      !this.newBorrower.contact ||
      !this.newBorrower.address ||
      !this.newBorrower.nic
    ) {
      console.log('One or more required fields are empty:', this.newBorrower);
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields.',
        icon: 'error',
      });
      return;
    }

    console.log('Submitting new borrower:', this.newBorrower);

    let postApi = 'http://localhost:8080/borrower/add';
    this.http.post(postApi, this.newBorrower).subscribe((data) => {
      this.loadBorrowers();
      Swal.fire({
        title: 'New Member Registration Successful!',
        text: `The registration for '${this.newBorrower.name}' has been successfully completed. Welcome to our library!`,
        icon: 'success',
      });
      this.newBorrower = {};
    });
  }
}
