import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book } from '../models/book';
import { Books } from '../models/books';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  books!: Book[];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<Books>({
      query: gql`
        query getBooks {
          books {
            title
          }
        }
      `
    }).valueChanges.subscribe(({ data }) => {
      this.books = data.books;
      console.log(this.books);
    })
  }
}
