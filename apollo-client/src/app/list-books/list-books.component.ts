import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book } from '../models/book';
import { Books } from '../models/books';

const ADD_BOOK = gql`
  mutation AddBook($bookInput: Book) {
    addBook(book: $bookInput) {
      title
    }
  }
`;

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  books!: Book[];
  loading!: boolean;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<Books>({
      query: gql`
        query getBooks {
          books {
            title
            author
            coverImage
            price
          }
        }
      `
    }).valueChanges.subscribe(({ data, loading }) => {
      this.books = data.books;
      this.loading = loading;
    })
  }

  addBook() {
    this.apollo.mutate({
      mutation: ADD_BOOK,
      variables: {
        book: {
          title: "Nothing but the truth"
        }
      }
    }).subscribe(
      ({data}) => {
        console.log("got data", data)
      },
      error => {
        console.log(error);
      }
    )
  }
}
