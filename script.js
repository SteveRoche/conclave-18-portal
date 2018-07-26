var carousel = document.querySelector('.carousel'),
	carouselList = document.querySelector('.carousel-view ul')
	carouselItems = document.querySelectorAll('.carousel-view ul li'),
	carouselLength = carouselItems.length,
	dots = document.querySelector('.carousel-dots ul'),
	carouselPrevious = document.querySelector('.carousel .carousel-previous'),
	carouselNext = document.querySelector('.carousel .carousel-next'),
	currentPage = 0,
	interval = 5000;

function sizeCarouselElements()  {
	var windowWidth = window.innerWidth;
	carouselList.style.width = `${windowWidth * carouselLength}px`;
	for (var i = 0; i < carouselLength; i++) carouselItems[i].style.width = `${windowWidth}px`;
}

function generateCarouselDots() {
	for (var i = 0; i < carouselLength; i++) {
		var dot = document.createElement('li');
		dots.appendChild(dot);
	}
	dots.firstChild.className = 'active';
}

function updateCarouselDots() {
	var dotsChildren = dots.childNodes;
	for (var i = 0; i < dotsChildren.length; i++) dotsChildren[i].className = '';
	dotsChildren[currentPage].className = 'active';
}

function handleCarouselPreviousClicked() {
	if (currentPage <= 0) 
		currentPage = carouselLength - 1;
	else
		currentPage--;
	animateViewToCurrentPage();
	updateCarouselDots();
}

function handleCarouselNextClicked() {
	console.log("Next");
	if (currentPage >= carouselLength - 1) 
		currentPage = 0;
	else
		currentPage++;
	animateViewToCurrentPage();
	updateCarouselDots();
}

function setViewToCurrentPage() {
	carouselList.className = '';
	carouselList.style.left = `${-window.innerWidth*currentPage}px`;
}

function animateViewToCurrentPage() {
	carouselList.className = 'animate';
	carouselList.style.left = `${-window.innerWidth*currentPage}px`;
}

sizeCarouselElements();
generateCarouselDots();
window.addEventListener('resize', sizeCarouselElements);
window.addEventListener('resize', setViewToCurrentPage);
carouselPrevious.addEventListener('click', handleCarouselPreviousClicked);
carouselNext.addEventListener('click', handleCarouselNextClicked);

// const scroll = setInterval(() => {
	// if (currentPage >= carouselLength -1)
		// currentPage = 0;
	// else
		// currentPage++;
	// animateViewToCurrentPage();
	// updateCarouselPagination();
// }, interval);
