
import { GoogleGenAI, Type } from "@google/genai";
import { SpendingPolicy, DecisionStatus, Subscription } from "../types";

// Always use named parameter for apiKey
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeTransaction = async (
  merchant: string,
  amount: number,
  policy: SpendingPolicy,
  currentSubs: Subscription[],
  isTrial: boolean = false
) => {
  try {
    const prompt = `
      You are AutoPay Guardian, an autonomous AI wallet agent.
      Analyze this incoming subscription payment request:
      - Merchant: ${merchant}
      - Amount: $${amount}
      - Current Monthly Total: $${currentSubs.reduce((acc, s) => acc + s.amount, 0)}
      - Is Trial Conversion: ${isTrial}

      Policies:
      - Monthly Cap: $${policy.monthlyCap}
      - Max per Individual Subscription: $${policy.maxPerSubscription}
      - Inactivity Threshold: ${policy.inactivityThresholdDays} days
      - Trusted Merchants: ${policy.trustedMerchants.join(', ')}

      Current Subscriptions in Wallet:
      ${currentSubs.map(s => `- ${s.name}: $${s.amount}, Last Used: ${s.lastUsed}, Status: ${s.status}`).join('\n')}

      DECISION LOGIC:
      1. If Merchant is NOT in trusted list, flag as RISK.
      2. If Amount > Max per Subscription, BLOCK.
      3. If (Current Total + Amount) > Monthly Cap, BLOCK.
      4. If Merchant exists and Status is 'paused', ASK user for reactivation.
      5. If isTrial is true and Merchant is unknown, BLOCK to prevent silent conversion.
      6. If Merchant is trusted and within limits, APPROVE.

      Return a JSON object with:
      - status: APPROVE, BLOCK, PAUSE, or ASK
      - reasoning: Clear explanation for the user
      - policyViolated: (Optional) The name of the policy rule triggered
    `;

    // Use gemini-3-flash-preview for fast autonomous decisions
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            policyViolated: { type: Type.STRING }
          },
          required: ["status", "reasoning"]
        }
      }
    });

    // Extract text property directly, do not call as a method
    const resultText = response.text || "{}";
    return JSON.parse(resultText);
  } catch (error) {
    console.error("AI Decision Error:", error);
    return {
      status: DecisionStatus.ASK,
      reasoning: "The agent encountered an error during policy evaluation. Reverting to user for manual approval for safety."
    };
  }
};
