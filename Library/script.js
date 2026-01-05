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
    isRead = (isRead == "true")? true:false;
    const createdBook = new Book(uuid,title,author,pages,isRead);
    myLibrary.push(createdBook);
}


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
     

    const inputTitle = document.querySelector('input[name="bookTitle"]');
    const inputAuthor = document.querySelector('input[name="authorName"]');
    const inputPages = document.querySelector('input[name="noPages"]');
    const inputRead = document.querySelector('figcaption>input[name="isRead"]:checked');
    event.preventDefault(); // Prevent the form from submitting in the traditional way (which refreshes the page)
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
                
                if(eachBook[data] == true){
                    newReadButton.textContent = "Read";
                    newReadButton.style.backgroundColor = "green";
                }
                else{
                    newReadButton.textContent = "Unread";
                    newReadButton.style.backgroundColor = "red";
                }
                newReadButton.type = "button";
                newRemoveButton.textContent = "Remove";
                newRemoveButton.type = "button";

                newReadButton.addEventListener("click",(e)=>{
                    const readStatus = (newReadButton.textContent=="Read")? "Unread":"Read";;
                    newReadButton.textContent = readStatus;
                    if(readStatus=="Read"){
                        newReadButton.style.backgroundColor = "green";
                    }
                    else{
                        newReadButton.style.backgroundColor = "red";
                    }
                    updateReadStatus(newTR.dataset.uuid,readStatus);
                });

                newRemoveButton.addEventListener("click",(e)=>{
                    removeBookFromLibrary(newTR.dataset.uuid);
                    newTR.remove();
                });
                
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

function updateReadStatus(uuid,readStatus){
    // console.log(uuid + readStatus);
    const indexPosition = myLibrary.findIndex(book => book.uuid == uuid);
    myLibrary[indexPosition].isRead = (readStatus == "Read")? true:false;
    console.dir(myLibrary);
}

function removeBookFromLibrary(uuid){
    const indexPosition = myLibrary.findIndex(book => book.uuid == uuid);
    if (indexPosition > -1){
        myLibrary.splice(indexPosition,1);
    }

}

