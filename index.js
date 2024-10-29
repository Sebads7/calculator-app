const themeToggle = document.querySelector(".button-container");
const themeSections = document.querySelectorAll(".theme-toggle");
let theme = 1;

fetch("constants/buttons.json")
  .then((res) => res.json())
  .then((data) => {
    const calculator = document.getElementById("calculator-buttons");
    const display = document.getElementById("display");

    data.calculator.forEach((buttonData) => {
      const button = document.createElement("button");
      button.textContent = buttonData.button;
      button.id = buttonData.id;
      button.className = "calc-button";

      // Apply theme to button
      button.setAttribute("data-theme", theme);

      calculator.appendChild(button);

      if (!isNaN(buttonData.id)) {
        button.addEventListener("click", () => {
          display.textContent += buttonData.button;
        });
      } else if (buttonData.id === "DEL") {
        button.addEventListener("click", () => {
          display.textContent = display.textContent.slice(0, -1);
        });
      } else if (buttonData.id === "RES") {
        button.addEventListener("click", () => {
          display.textContent = "";
        });
      } else if (buttonData.id === "=") {
        button.addEventListener("click", () => {
          try {
            display.textContent = eval(display.textContent.replace("x", "*"));
          } catch (error) {
            display.textContent = "Error";
          }
        });
      } else {
        button.addEventListener("click", () => {
          display.textContent +=
            buttonData.button === "+"
              ? "*"
              : buttonData.button === " -"
              ? "/"
              : buttonData.button;
        });
      }
    });
  })
  .catch((error) => console.log("error", error));

themeToggle.addEventListener("click", () => {
  // console.log("clicked");
  theme = theme < 3 ? theme + 1 : 1;

  themeSections.forEach((section) => {
    section.setAttribute("data-theme", theme);
  });

  // Update theme for calculator buttons
  const buttons = document.querySelectorAll(".calc-button");
  buttons.forEach((button) => {
    button.setAttribute("data-theme", theme);
  });

  // console.log(theme);
});
