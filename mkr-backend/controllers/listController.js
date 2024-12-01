import { List } from "../models/list.js";

export const createList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: "Title and user are required." });
    }

    const list = new List({
      title,
      items: [],
      user: userId,
    });

    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to create the list.", error });
  }
};

export const addItemToList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const { itemName } = req.body;

    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: "List not found" });

    list.items.push({ name: itemName });
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to list", error });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const userId = req.params.userId;
    const lists = await List.find({ user: userId });
    if (!lists) {
      return res.status(200).json([]);
    }
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lists", error });
  }
};

export const deleteList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const deletedList = await List.findByIdAndDelete(listId);
    if (!deletedList)
      return res.status(404).json({ message: "List not found" });

    res.status(200).json(deletedList);
  } catch (error) {
    res.status(500).json({ message: "Error deleting list", error });
  }
};

export const markItemAsCompleted = async (req, res) => {
  try {
    const { listId, itemId } = req.body;
    console.log("listId:", listId, "itemId:", itemId);

    const list = await List.findOne({
      _id: listId,
      "items._id": itemId,
    });
    console.log("Found list:", list);

    const updatedList = await List.findOneAndUpdate(
      { _id: listId, "items._id": itemId },
      { $set: { "items.$.completed": true } },
      { new: true }
    );
    console.log("Updated list:", updatedList);

    if (!updatedList)
      return res.status(404).json({ message: "List or item not found" });

    res.status(200).json(updatedList);
  } catch (error) {
    console.error("Error marking item as completed:", error);
    res.status(500).json({ message: "Error marking item as completed", error });
  }
};

export const deleteItemFromList = async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const list = await List.findByIdAndUpdate(
      listId,
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );
    if (!list) {
      return res.status(404).json({ message: "List or item not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Error deleting item from list", error });
  }
};
