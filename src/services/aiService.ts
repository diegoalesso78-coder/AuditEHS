export async function getEHSRecommendations(stdTitle: string, compliancePct: number, deviations: string) {
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stdTitle, compliancePct, deviations }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "No se pudieron generar recomendaciones.";
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    return "No disponible en este momento.";
  }
}
