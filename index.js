const themeToggle = document.querySelector(".button-container");
const themeSections = document.querySelectorAll(".theme-toggle");

let theme = 1;

fetch("constants/buttons.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const calculator = document.getElementById("calculator-buttons");

    data.calculator.forEach((buttonData) => {
      const button = document.createElement("button");
      button.textContent = buttonData.button;
      button.id = buttonData.id;
      button.className = "calc-button";

      // Apply theme to button
      button.setAttribute("data-theme", theme);

      calculator.appendChild(button);
    });
  })
  .catch((error) => console.log("error", error));

themeToggle.addEventListener("click", () => {
  console.log("clicked");
  theme = theme < 3 ? theme + 1 : 1;

  themeSections.forEach((section) => {
    section.setAttribute("data-theme", theme);
  });

  // Update theme for calculator buttons
  const buttons = document.querySelectorAll(".calc-button");
  buttons.forEach((button) => {
    button.setAttribute("data-theme", theme);
  });

  console.log(theme);
});
