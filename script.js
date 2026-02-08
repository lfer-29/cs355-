function toggleDarkMode(){
    if(localStorage.getItem('theme')=='dark')
        localStorage.removeItem('theme');
    else
        localStorage.setItem('theme','dark');
    setRootTheme();
}
function setRootTheme(){
    const root=document.documentElement;
    if(localStorage.getItem('theme')=='dark')
        root.setAttribute('theme','dark');
    else
        root.removeAttribute('theme');
}
window.addEventListener('load',setRootTheme);

const $ = document.querySelector.bind(document);
$('#button1').addEventListener('click', toggleDarkMode);
