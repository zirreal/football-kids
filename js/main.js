// burger button
const burger = document.querySelector('.burger__btn');
const menu = document.querySelector('.burger-menu');
const overlay = document.querySelector(".overlay");
const menuLink = document.querySelectorAll('.menu__link');

burger.addEventListener('click', function() {
  burger.classList.toggle('open');
  menu.classList.toggle('active');
  overlay.classList.toggle('open');

})

// close menu on click

menuLink.forEach((item) => {
  item.addEventListener('click', function() {
    burger.classList.remove('open');
    menu.classList.remove('active');
    overlay.classList.remove('open');
  })
})


// activate/deactivate scroll

const stopScroll = () => {
  document.body.classList.add("disable-scroll");
};

const getScroll = () => {
  document.body.classList.remove("disable-scroll");
}


// overlay 

overlay.addEventListener("click", () => {
  overlay.classList.remove("open");
  menu.classList.remove('active');
  burger.classList.remove('open');


  getScroll();
});



//tabs
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelector('.tabs');
  const tabsBtn = document.querySelectorAll('.tabs__btn');
  const tabsContent = document.querySelectorAll('.tabs__content');

  const changeClass = el => {
    tabsBtn.forEach((e) => {
      e.classList.toggle("active");
    })
  };

  tabsBtn.forEach((el) => {
    el.addEventListener('click', e => {
      const currBtn = e.target.dataset.btn;
      changeClass(e);
      for (let i = 0; i < tabsContent.length; i++) {
        tabsContent[i].classList.remove('active');
        if (tabsContent[i].dataset.coachesContent === currBtn) {
          tabsContent[i].classList.add('active');
        }
      }
    })
  });
});

//swiper
let mySwiper = new Swiper(".coaches-swiper", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 20,

  navigation: {
    nextEl: ".coaches__btn-next",
    prevEl: ".coaches__btn-prev",
  },
});

let mySwiper1 = new Swiper(".practices-photos__swiper-container", {
  direction: "horizontal",
  loop: true,

  navigation: {
    nextEl: ".practices-photos__btn-next",
    prevEl: ".practices-photos__btn-prev",
  },

  autoplay: {
    delay: 5000,
  },

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

});


//map 

document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [53.093068179893116, 49.989455015554704],
      zoom: 13,
      controls: ['zoomControl'],
    });
    var myGeoObject = new ymaps.Placemark([53.093068179893116, 49.989455015554704],
      {balloonContent: '<strong>Гимназия №1 </strong> <br> улица Ворошилова, 12'},
      {preset: 'islands#icon',
      iconColor: '#cc33ff'},
    );

    var myGeoObject1 = new ymaps.Placemark([53.09408062726152, 49.972104184867376],
      {balloonContent: '<strong>Школа №6 </strong> <br> Школьный переулок, 7'},
    );
  

    myMap.geoObjects.add(myGeoObject);
    myMap.geoObjects.add(myGeoObject1);
  }
});


// modal 

const btns = document.querySelectorAll('.take-a-lesson__btn');
const modal = document.querySelector(".modal-lesson");
const modalClose = document.querySelector(".modal-close");
const modalBtn = document.querySelector('.form__btn');
const input = document.querySelector('.form__input');

btns.forEach((e) => {
  e.addEventListener('click', function() {
    document.querySelector('.modal-lesson').classList.add('active');
    document.querySelector('.overlay').classList.add('open');

  document.body.classList.add("disable-scroll");
  })
})

modalClose.onclick = function () {
  modal.classList.remove("active");
  overlay.classList.remove("open");
  getScroll();
};

modalBtn.classList.add('disable');

input.addEventListener('input', function() {
  if(!input.value) {
    modalBtn.classList.add('disable');
  } else {
    modalBtn.classList.remove('disable');
  }
});

overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("open");
  document.querySelector('.modal-popup').classList.remove('active');

  getScroll();
});


// smooth scroll
function createSmoothScroll(e) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

  e.preventDefault();
  const targetID = this.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);

  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

  const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
          targetAnchor.tabIndex = "-1";
          targetAnchor.focus();
          window.history.pushState("", "", targetID);
          clearInterval(checkIfDone);
      }
  }, 2000);
}

const linksToAnchors = document.querySelectorAll('a[href^="#"]');

linksToAnchors.forEach(each => (each.onclick = createSmoothScroll));



//validation + form submit

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);


let validateForms = function(selector, rules, successModal, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
    messages: {
      name: 'Укажите ваше имя',
      phone: 'Укажите ваш телефон'},
    colorWrong: '#2E0062',
		submitHandler: function(form) {
      const popup = document.querySelector('.modal-popup');
      const popupClose = document.querySelector('.popup-close');

      modalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        });

      popupClose.addEventListener('click', function() {
        popup.classList.remove('active');
        overlay.classList.remove('open');

        getScroll();
      });


      let formData = new FormData(form);
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Отправлено');
					}
				}
			}

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

      modal.classList.remove('active');
      popup.classList.add('active');
      overlay.classList.add("open");
      stopScroll();
			form.reset();
		}
	});
}

validateForms('.form', {name: {required: true, minLength: 2, maxLength: 30}, phone: { required: true} }, '.modal-lesson', 'send goal');



