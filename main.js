const table = document.querySelector('.table');
const active = document.querySelector('.active');
const rotate = document.querySelector('.div-rotate');
const openDrawer = document.querySelector('#drawer-open');
const openDiv = document.querySelector('#open-div');
const computer = document.querySelector('.computer');
const computerOutput = document.querySelector('.computer-output');
const computerOpen = document.querySelector('#computer-open');
const computerClickOpen = document.querySelector('.computer-click-open');

active.addEventListener('click', ()=>{
    active.classList.add('none');
    table.classList.add('zoom');
});

rotate.addEventListener('click', ()=>{
    rotate.classList.add('none');
    table.classList.add('rotate');
    computer.classList.add('visible');
});

openDiv.addEventListener('click', ()=>{
    openDiv.classList.add('none');
    openDrawer.setAttribute('id', 'open')
    table.classList.add('open-rotate');
    computer.classList.add('open-drawer-computer');
});

computerOutput.addEventListener('click', ()=>{
    openDrawer.removeAttribute('id', 'open');
    computer.classList.add('computer-output');
    computerOutput.classList.add('none');
    computerClickOpen.classList.add('visible');
});

computerClickOpen.addEventListener('click', ()=>{
    table.classList.add('computer-table-rotate');
    computerClickOpen.setAttribute('id', 'none');
    computerOpen.setAttribute('id', 'open-computer');
});






















