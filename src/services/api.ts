const BASE_URL = "http://127.0.0.1:8000/api";

export async function simulateLumpSum(input: {
  ticker: string;
  start_date: string;
  amount: number;
}) {
  const res = await fetch(`${BASE_URL}/simulate/lump-sum`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lump sum simulation");
  }

  return res.json();
}

export async function simulateDCA(input: {
  ticker: string;
  start_date: string;
  monthly_investment: number;
}) {
  const res = await fetch(`${BASE_URL}/simulate/dca`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch DCA simulation");
  }

  return res.json();
}