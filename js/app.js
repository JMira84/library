const libraryWrapper = document.querySelector(".library-wrapper");

const form = document.querySelector("form");
const statusInput = document.querySelectorAll("input[type='radio']");
let selectedValue;

let myLibrary = JSON.parse(localStorage.getItem("library"));
myLibrary = myLibrary === null ? [] : myLibrary;

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

function clearElements() {
    let firstElement = libraryWrapper.firstElementChild;

    while (firstElement) {
        firstElement.remove();
        firstElement = libraryWrapper.firstElementChild;
    }
}

// Render elements
function render() {
    clearElements();
    for (let book of myLibrary) {
        const bookListWrapper = libraryWrapper.appendChild(document.createElement("div"));
        const bookList = bookListWrapper.appendChild(document.createElement("dl"));
        bookList.classList.add("book-list");
        bookList.dataset.book_id = myLibrary.indexOf(book);

        const bookTitle = bookList.appendChild(document.createElement("dt"));
        const bookAuthor = bookList.appendChild(document.createElement("dd"));
        const bookPages = bookList.appendChild(document.createElement("dd"));
        const bookStatusWrapper = bookListWrapper.appendChild(document.createElement("div"));
        const bookStatusTitle = bookStatusWrapper.appendChild(document.createElement("h2"));
        const bookStatus = bookStatusWrapper.appendChild(document.createElement("p"));
        const removeBookWrapper = bookListWrapper.appendChild(document.createElement("span"));
        const removeBook = removeBookWrapper.appendChild(document.createElement("i"));

        bookTitle.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");
        bookListWrapper.classList.add("book-list-wrapper");
        removeBookWrapper.classList.add("self-flex-end");
        bookStatusWrapper.classList.add("book-status-wrapper", "display-flex", "flex-column", "align-center");

        bookTitle.textContent = book.title.trim();
        bookAuthor.textContent = `by ${book.author.trim()}`;
        bookPages.textContent = `${book.pages.trim()} pages`;
        bookStatusTitle.textContent = "Read it?";
        bookStatus.textContent = `${book.readStatus}`

        if (bookStatus.textContent === "Yes") {
            bookStatus.classList.add("book-read");
        } else {
            bookStatus.classList.add("book-not-read");
        }

        bookStatus.classList.add("book-status");
        removeBook.classList.add("remove-button", "cursor-pointer", "las", "la-trash-alt");

        removeBook.addEventListener("click", deleteBook);

        bookStatus.addEventListener("click", changeStatus);
    }
}

// Push book into library
function addToLibrary(book) {
    myLibrary.push(book);
    save();
}

function formReset() {
    form.reset();
}

function radioCheck() {
    for (let status of statusInput) {
        if (status.checked) {
            selectedValue = status.value;
            break;
        }
    }
}

function formValidation() {
    radioCheck();
    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputPages = document.getElementById("pages").value;

    if (inputTitle === "" || inputAuthor === "" || inputPages === "" || !selectedValue) {
        return false;
    }

    return true;
}

// Submit book
function submitBook(e) {
    e.preventDefault();

    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputPages = document.getElementById("pages").value;
    radioCheck();

    if(formValidation()) {
        let newBook = new Book(inputTitle, inputAuthor, inputPages, selectedValue);
        addToLibrary(newBook);
        render();
        formReset();
    } else { 
        alert("Por favor preenche todos os campos.");
    }
}

// Delete book from library
function deleteBook(e) {
    if (e.target.classList.contains("remove-button")) {
        e.target.parentElement.parentElement.remove();

        const index = e.target.parentElement.parentElement.firstElementChild.getAttribute("data-book_id");
        myLibrary.splice(index, 1);

        save();
    }
}

// Change read status
function changeStatus(e) {
    const index = e.target.parentElement.parentElement.firstElementChild.getAttribute("data-book_id");
    const updatedBook = myLibrary[index];

    if (updatedBook.readStatus === "Yes") {
        updatedBook.readStatus = "No";
        e.target.textContent = "No";
        e.target.classList.remove("book-read");
        e.target.classList.add("book-not-read");
    } else if (updatedBook.readStatus === "No") {
        updatedBook.readStatus = "Yes";
        e.target.textContent = "Yes";
        e.target.classList.remove("book-not-read");
        e.target.classList.add("book-read");
    }

    save();
}

// Save books in localStorage
function save() {
    localStorage.removeItem('library');
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

form.addEventListener("submit", submitBook);

document.addEventListener("DOMContentLoaded", render);


// Show form
const plusIcon = document.querySelector(".plus-button");
function rotateIcon() {
    plusIcon.classList.toggle("rotate-icon");
}

function showForm() {
    const form = document.querySelector("form");
    form.classList.toggle("show-form");
    rotateIcon();
}

const buttonShow = document.querySelector(".show-form-button");

buttonShow.addEventListener("click", showForm);

// Toggle Header Shadow
const header = document.querySelector("header");
function toggleShadow() {
    if (document.body.scrollTop >= 110.8 || document.documentElement.scrollTop >= 110.8) {
        header.classList.add("show-header-shadow");
        return;
    } else {
        header.classList.remove("show-header-shadow");
        return;
    }
}

document.addEventListener("scroll", toggleShadow);
