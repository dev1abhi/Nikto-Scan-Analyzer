import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeVulnerabilityScan(scanText: string): Promise<string> {
  try {
    // Use the gemini-2.0-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Analyze the following vulnerability scan results and provide a comprehensive security assessment:
      
      1. Identify all critical, high, medium, and low severity vulnerabilities
      2. Categorize the vulnerabilities (e.g., XSS, SQL Injection, CSRF, etc.)
      3. Provide a summary of the most urgent issues that need to be addressed
      4. Recommend specific remediation steps for each type of vulnerability
      5. Suggest general security improvements based on the scan results
      
      Vulnerability Scan Results:
      ${scanText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing vulnerability scan:", error);
    throw new Error(`Failed to analyze: ${error instanceof Error ? error.message : String(error)}`);
  }
}