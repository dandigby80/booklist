class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
      const list = document.getElementById('book-list');
    
      // Creat a tr element
      const row = document.createElement('tr');
    
      // Insert cols
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='' class='delete'>x</a></td>
      `
    
      list.appendChild(row);
  }

  showAlert(message, className){
    // Create div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //insert into dom
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  //timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      const ui = new UI();
      ui.showAlert('Book Deleted', 'success')
    target.parentElement.parentElement.remove();
    }else{
      return
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI;
      //add book to ui
      ui.addBookToList(book);
    })
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event Listeners

//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form Values
  const title = document.getElementById('title').value, 
        author = document.getElementById('author').value, 
        isbn = document.getElementById('isbn').value;

  // Instatiate new book
  const book = new Book(title, author, isbn);

  // Instantiate new UI object
  const ui = new UI();

  //validate
  if(title === '' || author === '' || isbn === ''){
    // error alert
    ui.showAlert('Please fill in all fields', 'error');

  }else{
    // Add book to list
  ui.addBookToList(book);

  // Add to local storage
    Store.addBook(book);

    // show success
  ui.showAlert('Book Added', 'success');

  // clear fields
  ui.clearFields();
  }

  e.preventDefault()
})

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  

  //instantiate ui
  const ui = new UI();
  ui.deleteBook(e.target);

  //remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  e.preventDefault();
})

