/*
  manages light/dark mode.
*/

{
  const root = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const savedMode = window.localStorage.getItem("dark-mode");

  const applyMode = (value) => {
    root.dataset.dark = value ? "true" : "false";
    root.style.colorScheme = value ? "dark" : "light";
    root.style.backgroundColor = value ? "#030814" : "#ffffff";
    root.style.color = value ? "#f2f6ff" : "#24324a";
  };

  // immediately load saved mode, otherwise follow the browser setting
  applyMode(savedMode === null ? mediaQuery.matches : savedMode === "true");

  const onLoad = () => {
    // update toggle button to match loaded mode
    const toggle = document.querySelector(".dark-toggle");
    if (toggle) {
      toggle.checked = root.dataset.dark === "true";
    }
  };

  // after page loads
  window.addEventListener("load", onLoad);

  // keep following the browser preference until the user explicitly chooses
  mediaQuery.addEventListener("change", (event) => {
    if (window.localStorage.getItem("dark-mode") === null) {
      applyMode(event.matches);
      onLoad();
    }
  });

  // when user toggles mode button
  window.onDarkToggleChange = (event) => {
    const value = event.target.checked;
    applyMode(value);
    window.localStorage.setItem("dark-mode", value ? "true" : "false");
  };
}
