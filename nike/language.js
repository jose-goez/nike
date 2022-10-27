const body = document.body;
const galleryWrapper = document.querySelector(".gallery-wrapper");
const thumbList = galleryWrapper.querySelector(".thumb-list");
const thumbItems = thumbList.querySelectorAll("li");
const featuredList = galleryWrapper.querySelector(".featured-list");
const featuredItems = featuredList.querySelectorAll("li");
const featuredImgs = featuredList.querySelectorAll(".featured-img");
const openLightbox = galleryWrapper.querySelector(".open-lightbox");
const lightbox = document.querySelector(".lightbox");
const lightboxItems = lightbox.querySelector(".lightbox-items");
const lightboxControls = lightbox.querySelectorAll(".lightbox-control");
const lightboxPrevControl = lightbox.querySelector(".lightbox-control-prev");
const lightboxNextControl = lightbox.querySelector(".lightbox-control-next");
const closeLightbox = lightbox.querySelector(".close-lightbox");
const isActiveClass = "is-active";
const isVisibleClass = "is-visible";
const overflowYHiddenClass = "overflow-y-hidden";

/* IMAGE GALLERY
–––––––––––––––––––––––––––––––––––––––––––––––––– */
thumbItems.forEach((el) => {
  el.addEventListener("click", () => {
    thumbList.querySelector("li.is-active").classList.remove(isActiveClass);
    featuredList.querySelector("li.is-active").classList.remove(isActiveClass);
    let index = Array.from(thumbItems).indexOf(el);
    el.classList.add(isActiveClass);
    featuredList
      .querySelector(`li:nth-child(${++index})`)
      .classList.add(isActiveClass);
  });
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 38 || e.keyCode === 40) {
    const activeThumb = thumbList.querySelector("li.is-active");
    // up arrow
    if (e.keyCode === 38) {
      if (activeThumb.previousElementSibling) {
        activeThumb.previousElementSibling.click();
      } else {
        thumbList.lastElementChild.click();
      }
    } else {
      // down arrow
      if (activeThumb.nextElementSibling) {
        activeThumb.nextElementSibling.click();
      } else {
        thumbList.firstElementChild.click();
      }
    }
  }
});

Draggable.create(featuredImgs, {
  bounds: featuredList,
  inertia: true,
});

/* LIGHTBOX GALLERY
–––––––––––––––––––––––––––––––––––––––––––––––––– */
openLightbox.addEventListener("click", () => {
  if (lightboxItems.querySelector("li.is-active")) {
    lightboxItems.querySelector("li.is-active").classList.remove(isActiveClass);
  }
  body.classList.add(overflowYHiddenClass);
  const el = featuredList.querySelector("li.is-active");
  let index = Array.from(featuredItems).indexOf(el);
  lightboxItems
    .querySelector(`li:nth-child(n+${++index})`)
    .classList.add(isActiveClass);
  lightbox.classList.add(isVisibleClass);
});

document.addEventListener("click", (e) => {
  if (e.target === closeLightbox) {
    body.classList.remove(overflowYHiddenClass);
    lightbox.classList.remove(isVisibleClass);
  }
});

document.addEventListener("keyup", (e) => {
  // Esc
  if (document.querySelector(".lightbox.is-visible") && e.keyCode === 27) {
    body.classList.remove(overflowYHiddenClass);
    lightbox.classList.remove(isVisibleClass);
  }
});

for (const lightboxControl of lightboxControls) {
  lightboxControl.addEventListener("click", (e) => {
    const activeSlide = lightboxItems.querySelector("li.is-active");
    activeSlide.classList.remove(isActiveClass);
    if (e.currentTarget === lightboxNextControl) {
      activeSlide.nextElementSibling
        ? activeSlide.nextElementSibling.classList.add(isActiveClass)
        : lightboxItems.firstElementChild.classList.add(isActiveClass);
    } else {
      activeSlide.previousElementSibling
        ? activeSlide.previousElementSibling.classList.add(isActiveClass)
        : lightboxItems.lastElementChild.classList.add(isActiveClass);
    }
  });
}

document.addEventListener("keyup", (e) => {
  if (
    document.querySelector(".lightbox.is-visible") &&
    (e.keyCode === 37 || e.keyCode === 39)
  ) {
    // left arrow
    if (e.keyCode === 37) {
      lightboxPrevControl.click();
    } else {
      // next arrow
      lightboxNextControl.click();
    }
  }
});
