document.addEventListener('DOMContentLoaded', () => {
	var carousel = new Carousel();
});

class Carousel {
	constructor (autoScroll, interval) {
		this.el = document.querySelector('.carousel');
		this.list = document.querySelector('.carousel-view ul');
		this.items = document.querySelectorAll('.carousel-view ul li');
		this.length = this.items.length;
		this.dots = document.querySelector('.carousel-dots ul');
		this.prev = document.querySelector('.carousel .carousel-previous');
		this.next = document.querySelector('.carousel .carousel-next');
		this.currPage = 0;
		this.autoScroll = autoScroll || false;
		this.interval = interval || 6000;

		if (this.autoScroll)
			setInterval(this.nextHandler.bind(this), this.interval);

		this.resize();
		this.generateDots();
		window.addEventListener('resize', this.resize.bind(this));
		this.prev.addEventListener('click', this.prevHandler.bind(this));
		this.next.addEventListener('click', this.nextHandler.bind(this));
	}

	resize() {
		let windowWidth = window.innerWidth;
		this.list.style.width = `${windowWidth * this.length}px`;
		for (let i = 0; i < this.length; i++) this.items[i].style.width = `${windowWidth}px`;

		this.list.className = '';
		this.list.style.left = `${-window.innerWidth * this.currPage}px`;
	}

	generateDots() {
		for (let i=0; i<this.length; i++) {
			let dot = document.createElement('li');
			this.dots.appendChild(dot);
		}
		this.dots.firstChild.className = 'active';
	}

	updateDots() {
		let dotsChildren = this.dots.childNodes;
		for (let i=0; i<dotsChildren.length; i++) dotsChildren[i].className = '';
		dotsChildren[this.currPage].className = 'active';
	}

	prevHandler() {
		if (this.currPage <= 0)
			this.currPage = this.length - 1;
		else
			this.currPage--;
		this.animateToCurrPage();
		this.updateDots();
	}

	nextHandler() {
		if (this.currPage >= this.length - 1)
			this.currPage = 0;
		else
			this.currPage++;
		this.animateToCurrPage();
		this.updateDots();
	}

	animateToCurrPage() {
		this.list.className = 'animate';
		this.list.style.left = `${-window.innerWidth * this.currPage}px`;
	}
}