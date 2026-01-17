// JS: раскрытие текста под кнопкой "Обо мне"
const btnAbout = document.querySelector(".btn-about");
const btnTextMobile = document.querySelector(".btn-text-mobile");
const btnTextDesktop = document.querySelector(".btn-text-desktop");

function updateTextVisibility() {
  const isDesktop = window.matchMedia("(min-width: 64rem)").matches; // ≥1040px
  const isActive = btnAbout && btnAbout.classList.contains("active");

  if (isActive) {
    if (isDesktop) {
      if (btnTextDesktop) {
        btnTextDesktop.style.display = "block";
      }
      if (btnTextMobile) {
        btnTextMobile.style.display = "none";
      }
    } else {
      if (btnTextMobile) {
        btnTextMobile.style.display = "block";
      }
      if (btnTextDesktop) {
        btnTextDesktop.style.display = "none";
      }
    }
  } else {
    if (btnTextMobile) {
      btnTextMobile.style.display = "none";
    }
    if (btnTextDesktop) {
      btnTextDesktop.style.display = "none";
    }
  }
}

if (btnAbout) {
  btnAbout.addEventListener("click", (e) => {
    e.preventDefault();

    const scrollPosition = window.scrollY;

    btnAbout.classList.toggle("active");
    updateTextVisibility();

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  });

  window.addEventListener("resize", updateTextVisibility);
}

// ================= БУРГЕР МЕНЮ =================
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const burgerLinks = document.querySelectorAll(".burger-menu__link");

if (burger && burgerMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    document.body.style.overflow = burgerMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  burgerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      burgerMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// Появление хедера при свайпе вверх (только на мобильных)
const header = document.querySelector(".header");

function checkIfMobile() {
  return window.matchMedia("(max-width: 47.99rem)").matches;
}

function initHeaderScroll() {
  if (!checkIfMobile() || !header) return;

  let touchStartY = 0;
  let touchEndY = 0;
  let touchStartTime = 0;
  let lastScrollTop = 0;

  header.classList.add("visible");

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const touchDuration = Date.now() - touchStartTime;
      const swipeDistance = Math.abs(touchStartY - touchEndY);

      if (swipeDistance > 30 && touchDuration < 300) {
        if (touchStartY > touchEndY) {
          header.classList.add("visible");
        } else if (touchStartY < touchEndY) {
          header.classList.remove("visible");
        }
      }
    },
    { passive: true },
  );

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;

          if (currentScroll > lastScrollTop && currentScroll > 50) {
            header.classList.remove("visible");
          } else if (currentScroll < lastScrollTop) {
            header.classList.add("visible");
          }

          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });

        ticking = true;
      }
    },
    { passive: true },
  );
}

if (header) {
  initHeaderScroll();

  window.addEventListener("resize", () => {
    if (checkIfMobile()) {
      header.classList.add("visible");
    }
  });
}

// ================= АКТИВНАЯ ССЫЛКА КОНТАКТЫ =================
const contactsSection = document.getElementById("contacts");
const navContactsLink = document.querySelector(".nav__link-contacts");
const burgerContactsLink = document.querySelector(".burger-menu__link-contacts");

function updateContactsLinkActive() {
  if (!contactsSection) return;

  const rect = contactsSection.getBoundingClientRect();
  const isInView = rect.top <= 100 && rect.bottom >= 100;
  const hash = window.location.hash === "#contacts";

  if (isInView || hash) {
    if (navContactsLink) {
      navContactsLink.classList.add("nav__link--active");
    }
    if (burgerContactsLink) {
      burgerContactsLink.classList.add("burger-menu__link--active");
    }
  } else {
    if (navContactsLink) {
      navContactsLink.classList.remove("nav__link--active");
    }
    if (burgerContactsLink) {
      burgerContactsLink.classList.remove("burger-menu__link--active");
    }
  }
}

if (contactsSection) {
  updateContactsLinkActive();

  window.addEventListener("scroll", updateContactsLinkActive);
  window.addEventListener("hashchange", updateContactsLinkActive);
}

// ================= ФОРМА ОБРАТНОЙ СВЯЗИ =================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }

    // В реальном проекте здесь будет отправка на сервер
    // Для демо версии просто показываем сообщение
    const telegramLink = `https://t.me/arnipotapova?text=Привет! Меня зовут ${encodeURIComponent(name)}. Email: ${encodeURIComponent(email)}. Сообщение: ${encodeURIComponent(message)}`;
    
    alert(`Спасибо за ваше сообщение, ${name}! В реальном проекте форма будет отправлена на сервер. Сейчас вы можете связаться со мной через Telegram.`);
    
    // Очистка формы
    contactForm.reset();

    // Опционально: открыть Telegram с предзаполненным сообщением
    // window.open(telegramLink, '_blank');
  });
}
