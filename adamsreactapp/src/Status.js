const url = "https://adamsapimgmt.azure-api.net/status";
async function Status() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
      } catch (error) {
        console.log(error.message);
      }
}

export default Status;