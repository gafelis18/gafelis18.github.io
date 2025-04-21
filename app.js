document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const variedad = document.getElementById("variedad").value;
      const termino = document.getElementById("termino").value;
      const cajas = parseInt(document.getElementById("cajas").value);
      const kilos = parseFloat(document.getElementById("kilos").value);
      const entrada = { variedad, termino, cajas, kilos };
      const datos = JSON.parse(localStorage.getItem("recolectas") || "[]");
      datos.push(entrada);
      localStorage.setItem("recolectas", JSON.stringify(datos));
      alert("Guardado correctamente");
      form.reset();
    });
  }

  const resumen = document.getElementById("resumen");
  if (resumen) {
    const datos = JSON.parse(localStorage.getItem("recolectas") || "[]");
    let totalCajas = 0, totalKilos = 0;
    const porVariedad = {};
    const porTermino = {};

    datos.forEach(d => {
      totalCajas += d.cajas;
      totalKilos += d.kilos;
      porVariedad[d.variedad] = (porVariedad[d.variedad] || 0) + d.kilos;
      porTermino[d.termino] = (porTermino[d.termino] || 0) + d.kilos;
    });

    resumen.innerHTML = `
      <p><strong>Total de Cajas:</strong> ${totalCajas}</p>
      <p><strong>Total de Kilos:</strong> ${totalKilos}</p>
      <h3>Kilos por Variedad:</h3>
      <ul>${Object.entries(porVariedad).map(([v, k]) => `<li>${v}: ${k} kg</li>`).join("")}</ul>
      <h3>Kilos por Término:</h3>
      <ul>${Object.entries(porTermino).map(([t, k]) => `<li>${t}: ${k} kg</li>`).join("")}</ul>
    `;
  }
});
