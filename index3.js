  const btn = document.querySelector(".btn");
  const nav = document.querySelector(".nav");
  const activeClass = "active";

  const createOverlay = () => {
    const div = document.createElement("div");
    div.className = "overlay";
    document.body.appendChild(div);
    addListenerOnOverlay(div);
  };

  function addListenerOnOverlay(div) {
    div.addEventListener("click", () => {
      nav.classList.remove(activeClass);
      document.body.removeChild(div);
    });
  }

  btn.addEventListener("click", () => {
    nav.classList.add(activeClass);
    createOverlay();
  });