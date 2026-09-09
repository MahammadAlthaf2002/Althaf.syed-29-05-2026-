export async function compareProduct(input) {
  const response = await fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input })
  });
  if (!response.ok) throw new Error("Comparison request failed");
  return response.json();
}
