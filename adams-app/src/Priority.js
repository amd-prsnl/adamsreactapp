const url = "https://adamsapimgmt.azure-api.net/priority";

async function Priority() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error.message);
    }
  }

export default Priority;