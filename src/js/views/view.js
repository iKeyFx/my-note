import { noNoteHolder } from "../controller.js";
export const genNoteContainer = document.querySelector('.note_con');
export const noteArray = []
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const noteCon = document.querySelector('.note_con')
const confirmDetele = document.querySelector('.deleteCon')
const delYES = document.querySelector('.delYes')
const delCancel = document.querySelector('.delNo')

export const generateNote = function(data) {
    const monthName = month[data.createdAt.slice(5,7) - 1];
    
    const html = `
    <div class="note_inner" id=${data.id} style="background-color:${data.backgroundColor};">
    <div class="note_up">
     <div class="note_text">
        <p>${data.content}</p>
     </div>
    </div>
    <div class="note_down">
        <div class="note_date">
        <div class="d_month">${monthName}</div>
        <div class="d_day">${data.createdAt.slice(8,10)},</div>
        <div class="d_year">${data.createdAt.slice(0,4)}</div>
        </div>
        <div class="note_tools">
            <div class="note_color" id="${data.id}"> 
                <div class="note_edit color_picker_trigger">
                    <i class="fa-solid fa-paintbrush"></i>
                </div>
            <input class="inputColor" type="color" value="${data.backgroundColor}" id="colorPicker_${data.id}">
        </div>
            <div class="note_del" id="notedel_${el.id}">
            <i class="fa-solid fa-trash-can"></i>
            </div>
        </div>
    </div>
    </div>
    `
    genNoteContainer.insertAdjacentHTML('afterbegin', html)
    
} 

export const generateAllNote = function(data) {

    const reversedData = data.reverse();
    const html = reversedData.map((el) => {
        const monthName = month[el.title.slice(5,7) - 1];
       return `
        <div class="note_inner" id=${el.id} style="background-color:${el.backgroundColor};">
        <div class="note_up">
         <div class="note_text">
            <p>${el.content.slice(0, 200)}</p>
         </div>
        </div>
        <div class="note_down">
            <div class="note_date">
                <div class="d_month">${monthName}</div>
                <div class="d_day">${el.title.slice(8,10)},</div>
                <div class="d_year">${el.title.slice(0,4)}</div>
            </div>
            <div class="note_tools">
                <div class="note_color" id="${el.id}"> 
                    <div class="note_edit color_picker_trigger">
                    <i class="fa-solid fa-paintbrush"></i>
                    </div>
                    <input class="inputColor" type="color" value="${el.backgroundColor}" id="colorPicker_${el.id}">
                </div>
                <div class="note_del" id="notedel_${el.id}">
                <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        </div>
        </div>
        `
        
    }).join('')

    noNoteHolder.style.display = 'none';
    genNoteContainer.insertAdjacentHTML('beforeend', html);
    
} 

export const deleteHandler = function (handler) {
    noteCon.addEventListener('click', function (e) {
        const btn = e.target.closest('.note_del')
        if (!btn) return;
        const noteId = btn.id
        const clickedNote = document.getElementById(noteId);
        const rect = clickedNote.getBoundingClientRect();
        const yPos = rect.top + window.scrollY;
        confirmDetele.style.top = `${yPos - 300}px`;
        confirmDetele.classList.remove('hidden')
        delYES.addEventListener('click', () => {
            handler(noteId)
            setTimeout(() => {
            window.location.reload();
            }, 1000);
        } )
        delCancel.addEventListener('click', () => {
            confirmDetele.classList.add('hidden')
        } )
        
    })
}


