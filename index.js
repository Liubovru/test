document.addEventListener("DOMContentLoaded", () => {
    const tabsList = document.querySelector(".tabs__list");
    const firstTabBtn = tabsList.querySelector(".tabs__btn");
    const bar = document.querySelector(".bar");
    bar.style.width = firstTabBtn.clientWidth + "px";
  
    tabsList.addEventListener("click", event => {
      event.preventDefault();
      const target = event.target;
  
      if (!target.hasAttribute("href")) {
        return;
      }
      const { x, width } = getTargetParams(target);
      const href = target.getAttribute("href");
  
      transform(x, width);
      switchTab(href);
    });
  
    function transform(x, width) {
      bar.style.left = x + "px";
      bar.style.width = width + "px";
    }
  
    function getTargetParams(selector) {
      const nav = document.querySelector(".tabs__nav");
      const navX = nav.getBoundingClientRect().x;
      const s = selector.getBoundingClientRect();
      return {
        x: s.x - navX,
        width: s.width,
      };
    }
  
    function switchTab(selector) {
      const currentElement = document.querySelector(selector);
      const parent = currentElement.parentElement;
      const activeContent = parent.querySelector(".active");
  
      if (activeContent) {
        activeContent.classList.remove("active");
      }
      currentElement.classList.add("active");
    }
  });