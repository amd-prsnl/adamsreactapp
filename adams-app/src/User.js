const url = "http://localhost:5022/user";

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