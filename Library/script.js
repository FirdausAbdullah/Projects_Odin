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

function updateBookOnTable(libraryArr){    
    libraryArr.forEach(eachBook=>{
        const newTR = document.createElement("tr");
        for(let data in eachBook ){
            if(data=="uuid"){continue;}
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
