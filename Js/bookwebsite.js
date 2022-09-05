const ul = document.querySelector("#books")
const div = document.querySelector("#single-book")
const users = {username: "kalle", password: "kalle123"};

function login() {
    let getUserName = document.getElementById("username").value;
    let getUserPassword = document.getElementById("password").value;
    let userStatus = document.getElementById("loginStatus");

    
    
    if (getUserName == users.username && getUserPassword == users.password) {
        localStorage.setItem("username", getUserName);
        userStatus.textContent = "Logged-in as: " + localStorage.getItem("username");
            userStatus.style.color = "red";
    } else {
        alert("Wrong username or password")
    }
}

const createNode = (elem) => {
    return document.createElement(elem);
}
const appendNode = (parent, elem) => {
    parent.appendChild(elem);
}

const url = 'Json/bookwebsitetest.json';

const singleURL = window.location.search;
const urlParams = new URLSearchParams(singleURL);
const isbn = urlParams.get("isbn")

let singleTitle = document.querySelector(".single-book-title")
let total = document.querySelector("#total-book-price");
let sum = 0;

fetch(url)
    .then(resp => resp.json())
    .then(data => {

        if (isbn) {
            data = [...data].filter(book => {
                return book.isbn == isbn ? book : null
            });
            data.map((book) => {
                let divBox = createNode('div'),
                    cover = createNode('img'),
                    title = createNode('h1'),
                    description = createNode('p')
                    author = createNode('span'),
                    price = createNode('button');
                cover.src = book.cover;
                title.innerText = book.title;
                title.className = singleTitle;
                title.href = "singleBook.html?isbn=" + book.isbn;
                description.innerText = book.description;
                author.innerText = book.author;
    
                appendNode(divBox, cover);
                appendNode(divBox, title);
                appendNode(divBox, description);
                appendNode(divBox, author);
                appendNode(div, divBox);
    
                
            });
           

        }else {
            data.map((book) => {
            let li = createNode('li'),
                cover = createNode('img'),
                title = createNode('a'),
                author = createNode('span'),
                price = createNode('button');
            cover.src = book.cover;
            title.innerText = book.title;
            title.className = "book-title";
            title.href = "singleBook.html?isbn=" + book.isbn;

            author.innerText = book.author;
            price.innerText = book.price + "kr";
            price.addEventListener("click", function() {
                sum = sum + book.price;
                total.textContent = sum;
            })
            

            appendNode(li, cover);
            appendNode(li, title);
            appendNode(li, author);
            appendNode(li, price);
            appendNode(ul, li);

            
        });
    }}).catch(err => {
        console.error('Error: ', err);
});