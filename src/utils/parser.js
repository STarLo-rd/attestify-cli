export function parseLoginResponse(output) {
  try {
    // Find the JSON response in the output
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const response = JSON.parse(jsonMatch[0]);
    return {
      token: response.token,
      id: response.id,
      xpubkey: response.xpubkey,
    };
  } catch (error) {
    console.error("Failed to parse login response:", error);
    return null;
  }
}

export function parseCommitmentId(output) {
  try {
    console.log("commitmentId", output);
    const commitmentMatch = output.match(/"_id":\s*"([^"]+)"/);
    return commitmentMatch ? commitmentMatch[1] : null;
  } catch (error) {
    console.error("Failed to parse commitment ID:", error);
    return null;
  }
}
