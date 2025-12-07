// client/src/api/mutualfunds.js

export async function fetchMutualFundDetails(code) {
  try {
    const res = await fetch(`/api/mutualfund/${code}`);

    if (!res.ok) {
      console.error("MF API error:", res.status);
      return null;
    }

    const data = await res.json();

    // Expected response shape:
    // {
    //   code,
    //   schemeName,
    //   nav,
    //   prevNav,
    //   category,
    //   navDate
    // }

    return data;

  } catch (error) {
    console.error("Error fetching MF details:", error);
    return null;
  }
}
