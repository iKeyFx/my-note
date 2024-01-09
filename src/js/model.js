import { addNoteTextArea, noteInner } from "./controller.js";
import * as view from "./views/view.js"
import { API } from "./config.js";
export const store = {
    allnotes: [],
    newNote: [],
  };
  
  //Note Generator
  export const noteGen = async function () {
    try {
      const response = await fetch( `${API}`)
      const data = await response.json()

      store.allnotes = data.map((result) => {
        return {
          title: result.createdAt,
          id: result.id,
          content: result.content,
          backgroundColor: result.backgroundColor,
        };
      });
    } catch (err) {
      throw err
    }
  };
//   Post New Note 
  export const PostNote = async function () {
    try {
    const response = await fetch( `${API}`, {
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "content": addNoteTextArea.value,
    }),
    })
    const data = await response.json()
        view.generateNote(data)
    } catch (err) {
     throw err
    }
  };
//   Delete Note 
  export const deleteNote = async function (id) {
    try {
     const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
        }
      )
      const data = await response.json()
    } catch (err) {
    throw err
    }
  };

//   Change backgroundColor 
export const changeNoteBackground = async function (id, backgroundColor) {
    try {
      console.log(id, backgroundColor)
    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "backgroundColor": backgroundColor,
    }),
    })
    const data = await response.json()
    const noteElement = document.getElementById(id)
    if (noteElement) {
      noteElement.style.backgroundColor = data.backgroundColor;
    }
    } catch (err) {
    throw err
    }
  };