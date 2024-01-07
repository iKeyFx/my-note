import { noteCon } from "./view.js";

export const colorTriggers = function () {
    noteCon.addEventListener('click', (e) => {
        const note = e.target.closest('.note_color');
        if (!note) return
        const noteId = note.id
        const colorPicker = document.getElementById(`colorPicker_${noteId}`);
    
            if (colorPicker) {
                const rect = e.target.getBoundingClientRect();
                colorPicker.style.position = 'absolute';
                colorPicker.style.left = `${rect.left}px / 2`;
                colorPicker.style.top = `${rect.bottom}px / 2`;
                colorPicker.style.display = 'block'; 
                colorPicker.click(); 
            }
        
    })
}
// Function to handle the color change once the color picker value changes
export const changeBGhandler = function (handler) {
    noteCon.addEventListener('input', (e) => {
        const colorPicker = e.target.closest('.inputColor');
        
        if (colorPicker) {
            const colorPickerId = colorPicker.id.split("_")[1];
            handler(colorPickerId, colorPicker.value);
        }
    });
};

