const url = "https://adamsapimgmt.azure-api.net/user";

async function User() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error.message);
    }
  }

export default User;