let addbtn = document.querySelector("#addbtn");
let submit = document.querySelector("#submit");
let cancel = document.querySelector("#cancel");
let div1 = document.querySelector("#div1");
let div2 = document.querySelector("#div2");

let table = document.querySelector("#table");
// Initialize serial number based on existing rows
let sr = table.rows.length; // This accounts for header row




//function for add education button
function addetail(){
    div1.style.visibility="visible";
}


//function for submit button
function detailsubmit(){   

    div1.style.visibility="hidden";

    let degree = document.querySelector("#degree").value;
    let year = document.querySelector("#year").value;
    let regnum = document.querySelector("#reg").value;
    let university = document.querySelector("#university").value;

    const newrow = table.insertRow(-1);
    if(degree.length===0 || year.length===0 || regnum.length===0 || university.length===0){
        alert("Enter all the fields...");
    }else{
        newrow.insertCell(0).textContent=sr; // Use calculated serial number
        sr++; // Increment for next row


        newrow.insertCell(1).innerText=degree;
        newrow.insertCell(2).innerText=year;
        newrow.insertCell(3).innerText=regnum;
        newrow.insertCell(4).innerText=university;
        newrow.insertCell(5).innerHTML="<a id='edit' href='#' onClick='edit(this)'>Edit</a> / <a id='del' href='#' onClick='del(this)'>Delete</a>";
    }


    //clear input fields
    document.getElementById("degree").value=" ";
    document.getElementById("year").value=" ";
    document.getElementById("reg").value=" ";
    document.getElementById("university").value=" ";

    
}


//function for cancel button
function detailcancel(){
    div1.style.visibility="hidden"; 
  
    //clear input fields
    document.getElementById("degree").value=" ";
    document.getElementById("year").value=" ";
    document.getElementById("reg").value=" ";
    document.getElementById("university").value=" ";
}


//edit row function
function edit(x){
    let presenttr = x.parentElement.parentElement;
    div1.style.visibility='visible';

    document.querySelector("#degree").value = presenttr.cells[1].innerHTML;
    document.querySelector("#year").value = presenttr.cells[2].innerHTML;
    document.querySelector("#reg").value = presenttr.cells[3].innerHTML;
    document.querySelector("#university").value = presenttr.cells[4].innerHTML;

    presenttr.remove();
    updateSerialNumbers();
}


//dlete row function
function del(x){
    var deleterow = x.parentElement.parentElement;
    deleterow.remove();
    updateSerialNumbers();
}

//updates serial number of rows when deleted or edited
function updateSerialNumbers() {
    let rows = table.rows;
    // Start from 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        rows[i].cells[0].textContent = i;
    }
    // Update the global serial number counter
    sr = rows.length;
}



addbtn.addEventListener("click", addetail);
submit.addEventListener("click", detailsubmit);
cancel.addEventListener("click", detailcancel);
