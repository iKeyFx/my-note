import * as model from "./model.js";
import * as view from "./views/view.js"
// Element 
const noteAddedSuccessful = document.querySelector('.note_added--container')
const addNoteContainer = document.querySelector('.add_note--container')
export const noNoteHolder = document.querySelector('.no_note--holder')
const closeNoteBtn = document.querySelector('.new_note--close')
const addCompleteBtn = document.querySelector('.add_note--btn')
const inputFieldCl = document.querySelector('.clear_note--btn')
const addNewNoteBtn = document.querySelector('.btn_add-note')
export const addNoteTextArea = document.querySelector('.textarea')
const headerTag = document.getElementById('header')
const overLay = document.querySelector('.overlay')
const noteInputColor = document.querySelector('.note_edit')
export const noteInner = document.querySelector('.note_inner')
// Event
// noteInputColor.addEventListener('click', () => {
//   console.log(noteInputColor.value)
//   noteInner.style.backgroundColor = `${noteInputColor.value}`
// })

addNewNoteBtn.addEventListener('click', () => {
    OpenAddNewNoteBtn()
    ChecktextArea()
})

closeNoteBtn.addEventListener('click', () => {
    OpenAddNewNoteBtn()
    ClearInputField(addNoteTextArea.value)
})  
// addNoteTextArea.addEventListener('click', (e) => {
//     inputFieldCl.style.display = "flex";
// })
addNoteTextArea.addEventListener('focus', () => {
    inputFieldCl.style.display = "flex";
})
addNoteTextArea.addEventListener('focusout', () => {
    ChecktextArea()
})
addCompleteBtn.addEventListener('click', () => {
    noNoteHolder.style.display = 'none'
    addNoteContainer.classList.toggle('hidden')
    noteAddedSuccessful.classList.remove('hidden')
    setTimeout(() => {
        noteAddedSuccessful.classList.add('hidden')
        overLay.classList.toggle('hidden') 
        model.PostNote()
        // view.generateNote(model.PostNote)
        ClearInputField(addNoteTextArea.value)
    }, 2000);   
})
inputFieldCl.addEventListener('click', (e) => {
    ClearInputField(addNoteTextArea.value)
})

// Delete Event 
const controlEventDelete = function (id) {
     model.deleteNote(id)
}
// ChnageBG Color Event 
const controlBGEvent = function (id, color) {
    model.changeNoteBackground(id, color)
}
// function 
const OpenAddNewNoteBtn =  () => {
    overLay.classList.toggle('hidden')
    addNoteContainer.classList.toggle('hidden')
}

const ClearInputField = (value) => {
    const input = value;
    addNoteTextArea.value = input.slice(0, -0)
}

const ChecktextArea = () => {
    addNoteTextArea.value === "" || 
    addNoteTextArea.value.length <= 50 ? 
     addCompleteBtn.setAttribute('disabled', "") :
      addCompleteBtn.removeAttribute("disabled");
}


const loadGenNote = async function () {
    try {
      await model.noteGen();
      view.generateAllNote(model.store.allnotes)
    } catch (error) {
    }
  };

//   Init Function 
const init = function () {
    loadGenNote()
    view.deleteHandler(controlEventDelete)
    view.changeBGhandler(controlBGEvent)
  };
  init();