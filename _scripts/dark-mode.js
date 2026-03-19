/*
  manages light/dark mode.
*/

{
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const savedMode = window.localStorage.getItem("dark-mode");

  const applyMode = (value) => {
    document.documentElement.dataset.dark = value ? "true" : "false";
  };

  // immediately load saved mode, otherwise follow the browser setting
  applyMode(savedMode === null ? mediaQuery.matches : savedMode === "true");

  const onLoad = () => {
    // update toggle button to match loaded mode
    const toggle = document.querySelector(".dark-toggle");
    if (toggle) {
      toggle.checked = document.documentElement.dataset.dark === "true";
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
