const libraryWrapper = document.querySelector(".library-wrapper");

const form = document.querySelector("form");
const statusInput = document.querySelectorAll("input[type='radio']");
let selectedValue;

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

// Render elements
function render() {
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
}