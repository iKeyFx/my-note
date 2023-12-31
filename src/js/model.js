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
      const data = await fetch( `${API}`)
      .then((res) => res.json());

      store.allnotes = data.map((result) => {
        return {
          title: result.createdAt,
          id: result.id,
          content: result.content,
          backgroundColor: result.backgroundColor,
        };
      });
    } catch (err) {
     console.log(err)
    }
  };
//   Post New Note 
  export const PostNote = async function () {
    try {
    const data = await fetch( `${API}`, {
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "content": addNoteTextArea.value,
    }),
    }).then((res) => res.json())

        view.generateNote(data)
    } catch (err) {
      console.log(err)
    }
  };
//   Delete Note 
  export const deleteNote = async function (id) {
    try {
     await fetch(`${API}/${id}`, {
    method: "DELETE",
        }
      ).then((res) => res.json());
    } catch (err) {
     console.log(err)
    }
  };

//   Change backgroundColor 
export const changeNoteBackground = async function (id, backgroundColor) {
    try {
    const data = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "backgroundColor": backgroundColor,
    }),
    }).then((res) => res.json())
    // console.log(data)
    const noteElement = document.getElementById(id)
    if (noteElement) {
      noteElement.style.backgroundColor = data.backgroundColor;
    }
    } catch (err) {
     console.log(err)
    }
  };