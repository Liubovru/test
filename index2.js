document.addEventListener("DOMContentLoaded", () => {
  const textfield = document.querySelector(".textfield");
  const tasks = document.querySelector(".list");
  const tasksParent = document.querySelector(".list-parent");

  let buffer = {};

  const utils = {
    getTagName(el, target) {
      return el.tagName.toLowerCase() === target.toLowerCase();
    },
    isEmpty() {
      const isEmpty = tasks.children.length === 0;
      const msg = document.querySelector(".empty-message");
      if (!isEmpty && msg) {
        tasksParent.removeChild(msg);
      }

      if (isEmpty) {
        const p = document.createElement("p");
        p.textContent = "You are have not tasks.";
        p.className = "empty-message";
        tasksParent.appendChild(p);
      }
    },
    createBtns(elements) {
      return elements.map(item => {
        const btn = document.createElement("button");
        btn.className = `btn btn-${item.type} ${item.handler}`;
        btn.innerHTML = item.content;
        return btn;
      });
    },
  };

  utils.isEmpty();

  textfield.addEventListener("keyup", event => {
    const value = event.target.value;
    if (value.trim().length) {
      const keyCode = event.keyCode;

      switch (keyCode) {
        case 13: {
          !buffer.id ? createItem(value) : editItem(value);
          utils.isEmpty();
          event.target.value = "";
          break;
        }
        case 27: {
          if (buffer.id) {
            buffer = {};
            event.target.value = "";
          }
          break;
        }
      }
    }
  });

  tasks.addEventListener("click", event => {
    const { target } = event;
    const item = target.closest(".list-group-item");
    const btn = target.closest(".btn");

    if (item.hasAttribute("id") && btn) {
      const id = item.getAttribute("id");
      const parent = document.getElementById(id);

      target.classList.contains("delete")
        ? deleteItem(parent)
        : setToBuffer(parent);
    }
  });

  function deleteItem(selector) {
    tasks.removeChild(selector);
    utils.isEmpty();
  }

  function setToBuffer(selector) {
    const id = selector.getAttribute("id");
    const value = selector.querySelector("span").textContent;
    buffer = { id, value };
    textfield.value = value;
    textfield.focus();
  }

  function editItem(value) {
    const id = buffer.id;
    const parent = document.getElementById(id);
    const span = parent.querySelector("span");
    span.textContent = value;
    buffer = {};
  }

  function createListItem(value) {
    const item = document.createElement("div");
    item.className =
      "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

    const content = document.createElement("span");
    content.appendChild(document.createTextNode(value));
    item.setAttribute("id", Date.now());
    item.appendChild(content);

    const btns = utils.createBtns([
      {
        type: "primary",
        handler: "edit",
        content: `<i class="fa fa-edit" aria-hidden="true"></i>`,
      },
      {
        type: "danger",
        handler: "delete",
        content: `<i class="fa fa-trash" aria-hidden="true"></i>`,
      },
    ]);
    const btnContainer = document.createElement("div");
    btns.forEach(item => btnContainer.appendChild(item));
    item.appendChild(btnContainer);

    return item;
  }

  function createItem(value) {
    const li = createListItem(value);
    tasks.appendChild(li);
  }
});