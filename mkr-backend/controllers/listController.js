import List from "./models/List";

export const createList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title } = req.body;

    if (!title || !user) {
      return res.status(400).json({ message: "Title and user are required." });
    }

    const list = new List({
      title,
      items: items || [],
      user,
    });

    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to create the list.", error });
  }
};

export const addItemToList = async (listId, itemName) => {
  try {
    const list = await List.findById(listId);
    if (!list) throw new Error("List not found");

    list.items.push({ name: itemName });
    await list.save();
    return list;
  } catch (error) {
    console.error("Error adding item to list:", error);
    throw error;
  }
};

export const getAllLists = async () => {
  try {
    const userId = req.params.userId;
    const lists = await List.find({ user: userId });
    return lists;
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

export const deleteList = async (listId) => {
  try {
    const deletedList = await List.findByIdAndDelete(listId);
    if (!deletedList) throw new Error("List not found");
    return deletedList;
  } catch (error) {
    console.error("Error deleting list:", error);
    throw error;
  }
};

export const markItemAsCompleted = async (listId, itemId) => {
  try {
    const list = await List.findOneAndUpdate(
      { _id: listId, "items._id": itemId },
      { $set: { "items.$.completed": true } },
      { new: true }
    );
    if (!list) throw new Error("List or item not found");
    return list;
  } catch (error) {
    console.error("Error marking item as completed:", error);
    throw error;
  }
};

export const deleteItemFromList = async (listId, itemId) => {
  try {
    const list = await List.findByIdAndUpdate(
      listId,
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );
    if (!list) throw new Error("List or item not found");
    return list;
  } catch (error) {
    console.error("Error deleting item from list:", error);
    throw error;
  }
};
