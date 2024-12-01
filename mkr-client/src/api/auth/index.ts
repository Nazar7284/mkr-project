import axios from "axios";

export async function loginUser({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) {
  try {
    const response = await axios.post("http://localhost:8000/mkr/login", {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error login:", error);
  }
}

export async function createUser({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      "http://localhost:8000/mkr/registration",
      {
        userName,
        password,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error registration:", error);
  }
}
