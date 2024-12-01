import axios from "axios";

const userId = localStorage.getItem("userId");

export async function createList(title: string) {
  try {
    const response = await axios.post(
      `http://localhost:8000/mkr/list/${userId}`,
      {
        title,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error create login:", error);
  }
}

export async function addItemToList({
  listId,
  itemName,
}: {
  listId: string;
  itemName: string;
}) {
  try {
    const response = await axios.post(
      `http://localhost:8000/mkr/list/add/${listId}`,
      {
        itemName,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error of this:", error);
  }
}

export async function getLists() {
  try {
    const response = await axios.get(
      `http://localhost:8000/mkr/list/${userId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error registration:", error);
  }
}

export async function deleteList({ listId }: { listId: string }) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/mkr/list/${listId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error registration:", error);
  }
}

export async function itemComplete({
  listId,
  itemId,
}: {
  listId: string;
  itemId: string;
}) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/mkr/list/complete`,
      {
        listId,
        itemId,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error item complete process:", error);
  }
}

export async function deleteItemFromList({
  listId,
  itemId,
}: {
  listId: string;
  itemId: string;
}) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/mkr/list/${listId}/${itemId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error registration:", error);
  }
}
