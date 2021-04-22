// Book Constructor

function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI(){};

// Add book to list
UI.prototype.addBookToList = function(book){
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

//Show alert
UI.prototype.showAlert = function(message, className){
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

// clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listeners

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
    // show success
  ui.showAlert('Book Added', 'success');

  // clear fields
  ui.clearFields();
  }

  e.preventDefault()
})

