import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  LibraryContainer,
  Content,
  Title,
  AddBookForm,
  FormGroup,
  Label,
  Input,
  Button,
  BookList,
  BookItem,
  BookTitle,
  BookAuthor,
  ActionButton,
} from '../../styles/LibraryStyles';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(response.data.books);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]); // Ensure books state does not remain undefined
      setError('Failed to fetch books. Please try again.');
    }
  };

  const addBook = async (book) => {
    try {
      await axios.post('http://localhost:4000/api/v1/library', {
        bookname: book.title,
        author: book.author,
      });
      fetchBooks(); // Re-fetch books after adding
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    }
  };

  const handleBookPick = async (bookId, studentId) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/library/pick/${bookId}`, { studentId });
      fetchBooks();
    } catch (error) {
      console.error('Error picking book:', error);
      setError('Failed to pick the book. Please try again.');
    }
  };

  const handleBookReturn = async (bookId, studentId) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/library/return/${bookId}`, { studentId });
      fetchBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      setError('Failed to return the book. Please try again.');
    }
  };

  return (
    <LibraryContainer>
      <Sidebar />
      <Content>
        <Title>Library Management</Title>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <AddBookForm
          onSubmit={(e) => {
            e.preventDefault();
            const book = {
              title: e.target.title.value,
              author: e.target.author.value,
            };
            addBook(book);
            e.target.reset();
          }}
        >
          <h2>Add New Book</h2>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input type="text" id="title" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="author">Author:</Label>
            <Input type="text" id="author" required />
          </FormGroup>
          <Button type="submit">Add Book</Button>
        </AddBookForm>

        <h2>Books</h2>
        {books.length > 0 ? (
          <BookList>
            {books.map((book) => (
              <BookItem key={book._id}>
                <BookTitle>{book.bookname}</BookTitle>
                <BookAuthor>by {book.author}</BookAuthor>
                <ActionButton onClick={() => handleBookPick(book._id, 'student123')}>Pick</ActionButton>
                <ActionButton onClick={() => handleBookReturn(book._id, 'student123')}>Return</ActionButton>
              </BookItem>
            ))}
          </BookList>
        ) : (
          <p>No books available</p>
        )}
      </Content>
    </LibraryContainer>
  );
};

export default Library;
