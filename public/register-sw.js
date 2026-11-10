if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registro) => console.log("SW registrado:", registro.scope))
      .catch((erro) => console.warn("Falha ao registrar SW:", erro));
  });
}
