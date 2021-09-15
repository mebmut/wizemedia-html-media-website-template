const slideUp = document.querySelector('.go-up');
const sidebar = document.querySelector('.sidebar');
const resize = document.querySelector('.sidebarResize');
const pageContainer = document.querySelector('.page-container');

if (slideUp) {
    // set scroll up function for page to go to top 
    window.addEventListener('scroll',()=>{
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            slideUp.style.display = 'block';
        } else {slideUp.style.display = 'none';}
    });
    // set event listerner for button up click 
    slideUp.addEventListener('click',()=>{
        window.scroll({top:0,behavior: "smooth"});
    });

}

resize.addEventListener('click',()=>{
    sidebar.classList.toggle('resize');
    pageContainer.classList.toggle('sizeChange');
})