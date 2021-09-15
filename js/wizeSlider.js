
function wizeAutoSlider(target){

        const autoslider =  document.querySelector(target);
        const slider = autoslider.querySelector('.slider-container');
        const slideLeft = autoslider.querySelector('.srollLeft');
        const slideRight = autoslider.querySelector('.srollRight');
        const sliderItem = autoslider.querySelectorAll('.slider-item');
        const sliderBtn = autoslider.querySelectorAll('.slider-btn');
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
		
        let sliderWidth = slider.offsetWidth;
		if (slider.clientWidth < 520) {
			sliderWidth = sliderItem[0].clientWidth;
		}
        let sliderSpeed = autoslider.getAttribute('data-speed');
		autoslider.classList.add('autoslider');
        let speed = 0;
        if (!sliderSpeed) {
            speed = 50;
        }else{
            speed = sliderSpeed + 0;
        }
        // slide left button function 
		function hideButtons(){
			if (slider.scrollLeft <= 20) {
				slideLeft.style.display = "none";
			}else{
				slideLeft.style.display = "grid";
			}
			if (maxScrollLeft == 0) {
				slideRight.style.display = "none";
			}else{
				slideRight.style.display = "grid";
			}
		}hideButtons();
		slider.addEventListener('scroll',()=>{
			if (slider.scrollLeft <= 20) {
				slideLeft.style.display = "none";
			}else{
				slideLeft.style.display = "grid";
			}
			if (maxScrollLeft == 0) {
				slideRight.style.display = "none";
			}else{
				slideRight.style.display = "grid";
			}
		})
        slideLeft.addEventListener('click',()=>{
            slider.scrollLeft -= sliderWidth;
        });
        //slide right button function
        slideRight.addEventListener('click',()=>{
            if (slider.scrollLeft > (maxScrollLeft - 1)) {
                slider.scrollLeft -= maxScrollLeft;
            }else{
                slider.scrollLeft += sliderWidth;
            }
        }); 

        // pause autoslide when mouse is over the slider item 
        for (let item = 0; item < sliderItem.length; item++) {
            sliderItem[item].addEventListener('mouseover',()=>{
                clearInterval(autoMove);
            });
            sliderItem[item].addEventListener('mouseout',()=>{
                return autoMove = setInterval(autoSlide,speed);
            })
        }
        // set the function to autoSlide 
        function autoSlide (){
            if (slider.scrollLeft > (maxScrollLeft - 1)) {
                clearInterval(autoMove);
                slider.scrollLeft -= maxScrollLeft;
                setTimeout(() => {
                    return autoMove = setInterval(autoSlide,speed);
                }, 2000);
            }else{
                slider.scrollLeft += 10;
            }
        }
        // set the interval at which the slider will auto move 
        let autoMove = setInterval(autoSlide,speed);
        // let the slider stop moving if mouse is over the slider btn 
        for (let btn = 0; btn < sliderBtn.length; btn++) {
            sliderBtn[btn].addEventListener('mouseout',()=>{
                return autoMove = setInterval(autoSlide,speed);
            });
            sliderBtn[btn].addEventListener('mouseover',()=>{
                clearInterval(autoMove);
            });
        }

}

function wizeSlider() {
	const wizeSlider = document.querySelectorAll('.wizeSlider');

	for (sldr = 0; sldr < wizeSlider.length; sldr++) {
	    let slides = wizeSlider[sldr].getAttribute('data-slides');
	    let inner = wizeSlider[sldr].querySelector('.wizeSlider-inner');
	    let item = wizeSlider[sldr].querySelectorAll('.wizeSlider-item');
	    let contentMaxSize = wizeSlider[sldr].getAttribute('data-maxSize');
		let contentHeight = wizeSlider[sldr].getAttribute('data-height');
	    let prevButton = wizeSlider[sldr].querySelector('.prev');
	    let nextButton = wizeSlider[sldr].querySelector('.next');
	    let sliderDelay = inner.getAttribute('data-delay');
	    //set slider delay
	    if (sliderDelay) {
	        inner.style.transition = 'transform '+sliderDelay;
	    }else{
	        inner.style.transition = 'transform 0.5s';
	    }
	    // set default contentMaxSize to (100px) if not defined
	    if (contentMaxSize == null) {
	        contentMaxSize = 100;
	    }
		 // set default contentHeight to (200px) if not defined
	    if (contentHeight == null) {
	        contentHeight = 200;
	    }
	    //set default slide number to (1) if not set
	    if (slides == null) {
	        slides = 1;
	    }
	    if (slides == 1) {
	        contentMaxSize = 0;
	    }
	    //Get slider container width
	    let wizeSliderWidth = wizeSlider[sldr].offsetWidth;
	    //Hide next button if there is no overflow content
	    if (inner.offsetWidth <= wizeSliderWidth) {
	        nextButton.classList.add('hide');
	    }
	    //determin the content Size 
	    //based on slider width devided by number defined slides
	    let contentSize = wizeSliderWidth/slides - 16;
	    //set width to given maxWidth before checking if content size
	    //is less than maxSize
	    let contentWidth = contentMaxSize;
	    //Set content Width to content size if
	    //Content size is greater than given maxSize
	    if (contentSize > contentMaxSize) {
	        contentWidth = contentSize;
	    }
	    // reset the content width if number of 
	    //content * contentwidth is biger than slider width

	    if (contentSize*contentWidth > wizeSliderWidth) {
	        let split = wizeSliderWidth/contentWidth;
	        let number = split.toString().split(".")[0];
	        contentWidth = wizeSliderWidth/number -16;
	    }
	    //Change the width of the slider item to the
	    //the new content width
	    for (i= 0; i < item.length; i++) {
	        item[i].style.width = contentWidth+'px';
			item[i].style.height = contentHeight+'px';
	    }
	    //set next and prev event listeners for slider activation
	    let index = 0;
	    //Show next button if there is overflow content
	    if (inner.offsetWidth > wizeSliderWidth) {
	        nextButton.classList.remove('hide');
	    }
	    //slide elements onclik
	    nextButton.addEventListener('click',()=>{
	        index++;
	        prevButton.classList.add('show');
	        let amount = inner.offsetWidth - index * wizeSliderWidth;
	        let translate = index * wizeSliderWidth;
	        if (amount < wizeSliderWidth) {
	            translate = translate - contentWidth - 16;
	        }
	        inner.style.transform = 'translateX(-'+translate+'px)';
	        if (amount <= wizeSliderWidth) {
	            nextButton.classList.add('hide');
	        }
	    });
	    //slide back onclick
	    prevButton.addEventListener('click',()=>{
	        index--;
	        if (index <= 0) {
	            prevButton.classList.remove('show');
	        }
	        nextButton.classList.remove('hide');
	        inner.style.transform = 'translateX(-'+index * wizeSliderWidth+'px)';
	        let amount = inner.offsetWidth - index * wizeSliderWidth;
	        if (amount < wizeSliderWidth) {
	            nextButton.classList.add('hide');
	        }
	    })     
	}

}wizeSlider();

window.addEventListener('resize', ()=>{
	wizeSlider();
});
window.addEventListener('minimize', ()=>{
	wizeSlider();
});

