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