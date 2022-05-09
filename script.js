import createContainerAndHeader from './assets/js/containerAndHeader.js';
import createInput from './assets/js/textInput.js';
import createKeyboard from './assets/js/keyboard.js';
import keyData from './assets/js/keyData.js';

/* ===== Creating Page by recalling imported js files ===== */
createContainerAndHeader();
createInput();
createKeyboard();

/* ===== DOM Connection ===== */
const rows = document.querySelectorAll('.row');
const input = document.querySelector('.input');
const caps = document.querySelector('.CapsLock');

/* ===== Localstorage ===== */
function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const languag = localStorage.getItem('lang');
        if (languag === 'en') {
            for (let i = 0; i < 5; i += 1) {
                for (let j = 0; j < rows[i].children.length; j += 1) {
                    if (!caps.classList.contains('key_caps') && rows[i].children[j].textContent.length === 1) {
                        rows[i].children[j].innerHTML = keyData[i][j].key.en;
                    } else if (rows[i].children[j].textContent.length === 1) {
                        rows[i].children[j].innerHTML = keyData[i][j].key.en.toUpperCase();
                    }
                }
            }
        } else {
            for (let i = 0; i < 5; i += 1) {
                for (let j = 0; j < rows[i].children.length; j += 1) {
                    if (!caps.classList.contains('key_caps') && rows[i].children[j].textContent.length === 1) {
                        rows[i].children[j].innerHTML = keyData[i][j].key.ru;
                    } else if (rows[i].children[j].textContent.length === 1) {
                        rows[i].children[j].innerHTML = keyData[i][j].key.ru.toUpperCase();
                    }
                }
            }
        }
    }
    if (localStorage.getItem('checkCaps')) {
        const cap = localStorage.getItem('checkCaps');
        if (cap === 'true') {
            caps.classList.add('key_caps');
            for (let i = 0; i < 5; i += 1) {
                for (let j = 0; j < rows[i].children.length; j += 1) {
                    if (rows[i].children[j].textContent.length === 1) {
                        rows[i].children[j].innerHTML = rows[i].children[j].innerHTML.toUpperCase();
                    }
                }
            }
        }
    }
}
window.addEventListener('load', getLocalStorage);
let lang;
if (localStorage.getItem('lang') === 'ru') {
    lang = 'ru';
} else {
    lang = 'en';
}
let checkCaps;
if (localStorage.getItem('checkCaps') === 'true') {
    checkCaps = true;
} else {
    checkCaps = false;
}
let shft = false;
input.focus();
let cursor = input.selectionStart;

/* ===== SHIFT ===== */
function shiftDown() {
    if (!caps.classList.contains('key_caps')) {
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (Object.keys(keyData[i][j]).includes('shift')) {
                    rows[i].children[j].innerHTML = keyData[i][j].shift[lang];
                }
            }
        }
    } else {
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (Object.keys(keyData[i][j]).includes('shift') && rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = keyData[i][j].shift[lang].toLowerCase();
                }
            }
        }
    }
}

function shiftUp() {
    if (!caps.classList.contains('key_caps')) {
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                rows[i].children[j].innerHTML = keyData[i][j].key[lang];
            }
        }
    } else {
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = keyData[i][j].key[lang].toUpperCase();
                }
            }
        }
    }
}

function shiftChange(e) {
    if (e.type === 'keydown') {
        shiftDown();
    }
    if (e.type === 'keyup') {
        shiftUp();
    }
}

/* ===== TAB ===== */
function tabChange() {
    if (input.selectionStart !== input.selectionEnd) {
        let text = [...input.value];
        text.splice(input.selectionStart, input.selectionEnd - input.selectionStart, '    ');
        text = text.join('');
        input.value = text;
        cursor += 4;
        input.setSelectionRange(cursor, cursor);
    } else {
        input.setSelectionRange(cursor, cursor);
        let text = [...input.value];
        text.splice(cursor, 0, '    ');
        text = text.join('');
        input.value = text;
        cursor += 4;
        input.setSelectionRange(cursor, cursor);
    }
}

/* ===== BACKSPACE ===== */
function backspaceChange() {
    if (input.value.length !== 0 && cursor !== 0) {
        if (input.selectionStart !== input.selectionEnd) {
            let text = [...input.value];
            text.splice(input.selectionStart, input.selectionEnd - input.selectionStart);
            text = text.join('');
            input.value = text;
            input.setSelectionRange(cursor, cursor);
        } else {
            input.setSelectionRange(cursor, cursor);
            let text = [...input.value];
            text.splice(cursor - 1, 1);
            text = text.join('');
            input.value = text;
            cursor -= 1;
            input.setSelectionRange(cursor, cursor);
        }
    }
}

/* ===== DELETE ===== */
function deleteChange() {
    if (input.selectionStart !== input.value.length) {
        if (input.selectionStart !== input.selectionEnd) {
            let text = [...input.value];
            text.splice(input.selectionStart, input.selectionEnd - input.selectionStart);
            text = text.join('');
            input.value = text;
            input.setSelectionRange(cursor, cursor);
        } else {
            let text = [...input.value];
            text.splice(cursor, 1);
            text = text.join('');
            input.value = text;
            input.setSelectionRange(cursor, cursor);
        }
    }
}

/* ===== Enter ===== */
function enterChange() {
    if (input.selectionStart !== input.selectionEnd) {
        let text = [...input.value];
        text.splice(input.selectionStart, input.selectionEnd - input.selectionStart, '\n');
        text = text.join('');
        input.value = text;
        cursor += 1;
        input.setSelectionRange(cursor, cursor);
    } else {
        input.setSelectionRange(cursor, cursor);
        let text = [...input.value];
        text.splice(cursor, 0, '\n');
        text = text.join('');
        input.value = text;
        cursor += 1;
        input.setSelectionRange(cursor, cursor);
    }
}

/* ===== CAPSLOCK ===== */
function capsChange() {
    if (!caps.classList.contains('key_caps')) {
        caps.classList.add('key_caps');
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = rows[i].children[j].innerHTML.toUpperCase();
                }
            }
        }
        checkCaps = true;
    } else {
        caps.classList.remove('key_caps');
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = rows[i].children[j].innerHTML.toLowerCase();
                }
            }
        }
        checkCaps = false;
    }
}

/* ===== LANGUAGE CHANGE ( Shift + Alt ) ===== */
function langChange() {
    if (lang === 'en') {
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (!caps.classList.contains('key_caps') && rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = keyData[i][j].key.ru;
                } else if (rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = keyData[i][j].key.ru.toUpperCase();
                }
            }
        }
        lang = 'ru';
    } else {
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < rows[i].children.length; j += 1) {
                if (!caps.classList.contains('key_caps') && rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = keyData[i][j].key.en;
                } else if (rows[i].children[j].textContent.length === 1) {
                    rows[i].children[j].innerHTML = keyData[i][j].key.en.toUpperCase();
                }
            }
        }
        lang = 'en';
    }
    shft = false;
}

/* ===== TAB ===== */
rows.forEach((e) => {
    e.addEventListener('click', (event) => {
        input.focus();

        if (event.target.textContent.length === 1) {
            if (input.selectionStart === input.value.length) {
                cursor = input.value.length;
            }
            if (input.selectionStart !== input.selectionEnd) {
                let text = [...input.value];
                const currTarget = event.target.textContent;
                text.splice(input.selectionStart, input.selectionEnd - input.selectionStart, currTarget);
                text = text.join('');
                input.value = text;
                cursor += 1;
                input.setSelectionRange(cursor, cursor);
            } else {
                input.setSelectionRange(cursor, cursor);
                const text = [...input.value];
                text.splice(cursor, 0, event.target.textContent);
                input.value = text.join('');
                cursor += 1;
                input.setSelectionRange(cursor, cursor);
            }
            if (shft === true) {
                shiftUp();
                shft = false;
            }
        } else if (event.target.textContent === 'CapsLk') {
            capsChange();
        } else if (event.target.textContent === 'Tab') {
            tabChange();
        } else if (event.target.textContent === 'Backspace') {
            backspaceChange();
        } else if (event.target.textContent === 'Del') {
            deleteChange();
        } else if (event.target.textContent === 'Enter') {
            enterChange();
        } else if (event.target.textContent === 'en' || event.target.textContent === '🇷🇺') {
            langChange();
        } else if (event.target.textContent === 'Shift') {
            if (shft === false) {
                shiftDown();
                shft = true;
            } else {
                shiftUp();
                shft = false;
            }
        }
    });
});

/* ===== Main logic for KEYs ===== */
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey) {
        langChange();
    }
    if (e.key === 'Alt' || e.key === 'AltRight') {
        e.preventDefault();
    }
    if (e.key === 'Shift') {
        e.preventDefault();
        shiftChange(e);
    } else if (e.key === 'CapsLock') {
        e.preventDefault();
        capsChange();
    } else if (e.key === 'Tab') {
        e.preventDefault();
        tabChange();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        backspaceChange();
    } else if (e.key === 'Delete') {
        e.preventDefault();
        deleteChange();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        enterChange();
    } else if (e.key.length === 1) {
        e.preventDefault();
        input.focus();
        if (input.selectionStart !== input.selectionEnd) {
            let text = [...input.value];
            const cur = document.querySelector(`.${e.code}`).textContent;
            text.splice(input.selectionStart, input.selectionEnd - input.selectionStart, cur);
            text = text.join('');
            input.value = text;
            cursor += 1;
            input.setSelectionRange(cursor, cursor);
        } else {
            input.setSelectionRange(cursor, cursor);
            let text = [...input.value];
            const cur = document.querySelector(`.${e.code}`).textContent;
            text.splice(cursor, 0, cur);
            text = text.join('');
            input.value = text;
            cursor += 1;
            input.setSelectionRange(cursor, cursor);
        }
        if (shft === true) {
            shiftUp();
            shft = false;
        }
    }
    document.querySelector(`.${e.code}`).classList.add('key-active');
});
document.addEventListener('keyup', (e) => {
    document.querySelector(`.${e.code}`).classList.remove('key-active');
    if (e.key === 'Shift') {
        shiftChange(e);
    } else if (e.key.includes('Arrow')) {
        input.focus();
        cursor = input.selectionStart;
        input.setSelectionRange(cursor, cursor);
    }
});

/* ===== CURSOR ===== */
input.addEventListener('click', () => {
    if (input.selectionStart !== input.selectionEnd) {
        input.setSelectionRange(input.selectionStart, input.selectionEnd);
        cursor = input.selectionStart;
    } else {
        cursor = input.selectionStart;
        input.setSelectionRange(cursor, cursor);
    }
});

/* ===== LOCALSTORAGE ===== */
function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('checkCaps', checkCaps);
}
window.addEventListener('beforeunload', setLocalStorage);