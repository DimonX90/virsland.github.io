
document.addEventListener('DOMContentLoaded', function () {
	// Active nav links=====================================
	if (document.querySelector('.main-title')) {
		document.querySelector('.main-title').classList.add('_active');
	}
	if (document.querySelector('.contacts__body')) {
		document.querySelector('.contacts__body').classList.add('_active');
	}

	const menu = document.querySelectorAll('#link');
	for (let i = 0; i < menu.length; i++) {
		let li = menu[i];
		let menuItem = li.getAttribute('href');
		console.log(window.location.origin + `/` + menuItem);
		console.log(window.location.href);
		if ((window.location.origin + `/` + menuItem) == window.location.href) {
			menu[i].classList.add('_activeMenu')
		}
	}
	//======================================================
})
///BurgerMenu============================================
let burger = document.querySelector(".icon-menu");
let burgerBody = document.querySelector(".menu__body")
burger.addEventListener("click", function (e) {
	burger.classList.toggle("menu-open");
	burgerBody.classList.toggle("_active")
}
)
//==========================================================


//Hide HEADER==========================
let headerScroll = pageYOffset;
document.addEventListener('scroll', function () {

	const headerElement = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);
	const headerWrapper = document.querySelector('.header__wrapper');
	if (pageYOffset > headerScroll) {
		headerWrapper.classList.add('_hide');
	} else {
		headerWrapper.classList.remove('_hide');
	}
	headerScroll = pageYOffset;
})

//=========================================
//Swipper slider=======================================
if (document.querySelector('.swiper')) {
	const swiper = new Swiper('.swiper', {
		// Optional parameters
		direction: 'horizontal',
		observer: true,
		observeParents: true,
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			480: {
				slidesPerView: 2,
				spaceBetween: 1,
				slideToClickedSlide: true,
			},
			756: {
				slidesPerView: 3,
				spaceBetween: 0,
				slideToClickedSlide: true,
			},
			// when window width is >= 480px
			1070: {
				slidesPerView: 4,
				spaceBetween: 15,
				slideToClickedSlide: true,
			},
			// when window width is >= 640px
			1480: {
				slidesPerView: 4,
				spaceBetween: 15,
				slideToClickedSlide: true,
			},
		}
	});
}

//=====================================================
//Validation
const buttons = document.querySelectorAll('.form-Consultation__button');
const tel = document.querySelectorAll('._tel');
const inputs = document.querySelectorAll('input');
const closeBtn = document.querySelector('#close');
const messege = document.querySelector('.messege');
const form = document.querySelectorAll('form')
closeBtn.addEventListener('click', function () {
	messege.style.display = 'none';
})
for (let i = 0; inputs.length > i; i++) {
	inputs[i].addEventListener('focus', function () {
		if (inputs[i].value == 'Невірно вказан номер') {
			inputs[i].value = '';
		}
	})
}
for (let i = 0; buttons.length > i; i++) {
	buttons[i].addEventListener('click', function (e) {

		if (tel[i]) {
			if (phoneTest(tel[i])) {
				messege.style.display = 'block';
				function show() {
					messege.classList.add('_visible')
				}
				setTimeout(show, 500);
				e.preventDefault();
				closeBtn.addEventListener('click', function () {
					messege.style.display = 'none';
					form[i].submit();
					window.onbeforeunload = form[i].submit();
				})

			} else {
				tel[i].value = 'Невірно вказан номер';

				e.preventDefault();
			}
		}
	})
}

function phoneTest(input) {
	return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
}
//====================================================================================
window.addEventListener("load", windowLoad);
//Анимация счетчиков==========================
function windowLoad() {
	// Функція ініціалізації
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
		if (digitsCounters.length) {
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}
	// Функція анімації
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseFloat(digitsCounter.dataset.digitsCounter) ? parseFloat(digitsCounter.dataset.digitsCounter) : 1000;
		const startValue = parseFloat(digitsCounter.innerHTML);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			if (Number.isInteger(startValue)) { digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue)); }
			else { digitsCounter.innerHTML = (progress * (startPosition + startValue)).toFixed(1); }
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}
	// Пуск при завантаженні сторінки
	// digitsCountersInit();


	// Пуск при скроллі (появі блока з лічільниками)
	let options = {
		threshold: 0.3
	}
	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems);
				}
				// Вимкнути відслідковування після спрацювання
				observer.unobserve(targetElement);
			}
		});
	}, options);

	let sections = document.querySelectorAll('.numbers__item');
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section);
		});
	}
	//============================================================
}

//Анимации при скролле=============================================
document.addEventListener('scroll', function () {
	//Animation scroll=================================
	const animItems = document.querySelectorAll('._animeItem');

	if (animItems.length > 0) {
		function animOnScroll(params) {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = ofsset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {

					if (!animItem.classList.contains('_active')) {
						animItem.classList.add('_active');
					}
				} else {
					animItem.classList.remove('_active');
				}
			}
		}
		function ofsset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		animOnScroll();
	}
})

	//====================================================