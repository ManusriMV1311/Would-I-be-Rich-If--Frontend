console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export async function simulateLumpSum(input: {
  ticker: string;
  start_date: string;
  amount: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/simulate/lump-sum`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "Failed to fetch lump sum simulation");
  }

  return res.json();
}

export async function simulateDCA(input: {
  ticker: string;
  start_date: string;
  monthly_investment: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/simulate/dca`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "Failed to fetch DCA simulation");
  }

  return res.json();
}