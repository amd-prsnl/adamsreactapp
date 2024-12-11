const url = "https://adamsapimgmt.azure-api.net/priority";

async function Priority() {
  const requestMetadata = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'subscription-key': 'd50bc5f9220c4b8991707c58f08ee755'
    }
  };
    try {
      const response = await fetch(url, requestMetadata);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error.message);
    }
  }

export default Priority;