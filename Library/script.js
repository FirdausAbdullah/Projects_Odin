function Book(uuid,title,author,pages,isRead){
    this.title= title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead,
    this.uuid = uuid

    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.isRead)? "Read" : "Not Read"}` ;
    // }
};


const myLibrary = [];

function addBookToLibrary(title,author,pages,isRead){
    const uuid = crypto.randomUUID();
    const createdBook = new Book(uuid,title,author,pages,isRead);
    myLibrary.push(createdBook);
}


addBookToLibrary("CSI:Miami","John X",333,true);
addBookToLibrary("Spy Craft","Mel Grissom",27,true);
addBookToLibrary("How Can I?","James Rain",731,false);
addBookToLibrary("Invincible","Scott T. Helberg",90,true);
addBookToLibrary("Title Kills","Sara Keef",109,false);




// ------------ Display -----------------
const tableBody = document.querySelector("#tableBody");
const addBookButton = document.querySelector("#addBookButton");
const dialogPopup = document.querySelector("dialog");
const closeDialogButton = document.querySelector("#closeDialog");
const bookSubmission = document.querySelector("#addBookForm");
 

addBookButton.addEventListener("click",()=>{
    dialogPopup.showModal(); //tells <dialog> element to appear
});

closeDialogButton.addEventListener("click",()=>{
    dialogPopup.close();
});

bookSubmission.addEventListener("submit", (event)=> {
     // Prevent the form from submitting in the traditional way (which refreshes the page)

const inputTitle = document.querySelector('input[name="bookTitle"]');
const inputAuthor = document.querySelector('input[name="authorName"]');
const inputPages = document.querySelector('input[name="noPages"]');
const inputRead = document.querySelector('figcaption>input[name="isRead"]:checked');
    event.preventDefault();
    addBookToLibrary(inputTitle.value,inputAuthor.value,inputPages.value,inputRead.value);
    bookSubmission.reset();
    dialogPopup.close();  //close the popup after a successful submission
    updateBookOnTable(myLibrary);
});



function updateBookOnTable(libraryArr){   
    tableBody.replaceChildren(); 
    libraryArr.forEach(eachBook=>{
        const newTR = document.createElement("tr");
        for(let data in eachBook ){
            if(data=="uuid"){
                newTR.dataset.uuid = eachBook[data];
                continue;
            } //add data-uuid attribute

            else if(data=="isRead"){
                const newTD = document.createElement("td");
                const newReadButton = document.createElement("button");
                const newRemoveButton = document.createElement("button");
                
                newReadButton.textContent = (eachBook[data]==true)?"Read":"Unread";
                newReadButton.type = "button";
                newRemoveButton.textContent = "Remove";
                newRemoveButton.type = "button";
                
                newTD.appendChild(newReadButton);
                newTD.appendChild(newRemoveButton);
                newTR.appendChild(newTD);
                continue;
            }
            const newTD = document.createElement("td");
            newTD.textContent = eachBook[data];
            newTR.appendChild(newTD);
        }
        tableBody.appendChild(newTR);
        
    });
}
// function displayBook(libraryArr){
//     libraryArr.forEach(eachBook => {
//         console.dir(eachBook);
//     });
// }
updateBookOnTable(myLibrary);
