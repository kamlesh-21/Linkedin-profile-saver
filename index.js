// Declaring an empty array
let myLeads = []

// capturing elements for DOM manipulation 
const inputEl = document.getElementById("input-el")
const inputTwo = document.getElementById("input-two")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const removeBtn = document.getElementById("remove-btn")
const saveBtn = document.getElementById("save-btn")
//converting string to its original form  and storing it in a local variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//checking if the local varibale has any entries, and extrapolating this to array
if (leadsFromLocalStorage) {

    myLeads = leadsFromLocalStorage

    render(myLeads)
}

saveBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push ({
            url: tabs[0].url, 
            type: inputTwo.value
   })
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

//function to display entries
function render(leads) {
    //creating local variable to store values for display & to avoid DOM manipulation on every loop
    let listItems = ""
    //let listItems = JSON.stringify(leads)
    //looping through the parameter's length and appneding it in local variable with list tags 
    for (let i=0; i<leads.length; i++) {
    //for (let x in leads) {

        listItems += `
        <li>
            <a href=
                ${(leads[i].url)} target="_blank"> ${(leads[i].url)} 
            </a>
             - ${(leads[i].type)} 
        </li>`
        
        }
    //changing the UL element with local variable in HTML form
   
    ulEl.innerHTML = listItems
    inputTwo.value = ""
    
}


//function to delete all data
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

removeBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads.pop()
    localStorage.setItem('myLeads',JSON.stringify(myLeads));
    render(myLeads)
})

//storing input into the array 
inputBtn.addEventListener("click", function(){
    myLeads.push ({
         url: inputEl.value, 
         type: inputTwo.value
})
    //console.log(myLeads)
    // clearing input field
    inputEl.value = ""

    //persistently storing the value in string format from input field onto localstorage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    //calling function to display saved inputs
    render(myLeads)
})

