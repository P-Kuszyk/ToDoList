const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("listContainer");

function addTask() {
  if (inputBox.value === "") {
    alert("Musisz wpisać treść zadania.");
  } else {
    let li = document.createElement("LI");
    listContainer.appendChild(li);

    let input = document.createElement("INPUT");
    input.value = inputBox.value;
    li.appendChild(input);

    let span = document.createElement("SPAN");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  const inputs = document.querySelectorAll("input");
  const inputsArr = [];
  for (let i = 1; i < inputs.length; i++) {
    const status = inputs[i].parentElement.classList.contains("checked");
    inputsArr.push({
      textValue: inputs[i].value,
      checked: status,
    });
  }
  localStorage.setItem("data", JSON.stringify(inputsArr));
}

function showData() {
  const inputArr = JSON.parse(localStorage.getItem("data"));

  try {
    for (let i = 0; i < inputArr.length; i++) {
      let li = document.createElement("LI");
      listContainer.appendChild(li);
      if (inputArr[i].checked) {
        li.classList.add("checked");
      }

      let input = document.createElement("INPUT");
      input.value = inputArr[i].textValue;
      li.appendChild(input);
      input.addEventListener("focusout", () => {saveData()})

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
    }
  } catch {}
}

function sortTasks() {
  const inputsArr = JSON.parse(localStorage.getItem("data"));

  inputsArr.sort((a, b) => a.textValue.localeCompare(b.textValue));
  inputsArr.sort((a, b) => Number(a.checked) - Number(b.checked));

  localStorage.setItem("data", JSON.stringify(inputsArr));

  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  showData();
}

showData();
