import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { FaDeleteLeft } from "react-icons/fa6";
import {
  addItemToList,
  createList,
  deleteItemFromList,
  getLists,
  itemComplete,
} from "src/api/list";
import MyBtn from "src/components/Button";
import Header from "src/components/Header/Header";
import useModal from "src/hooks/useModal";
import CreateListModal from "src/ui/CreateListModal";

const Lists = () => {
  const { data: listData } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
  });
  const queryClient = useQueryClient();

  const listModal = useModal();
  const itemModal = useModal();

  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedListId(event.target.value);
  };

  const selectedList = listData?.find(
    (list: any) => list._id === selectedListId,
  );

  const handleCompleteItem = useMutation({
    mutationFn: itemComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleDeleteItem = useMutation({
    mutationFn: deleteItemFromList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"], exact: true });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
    },
  });

  return (
    <div className="ml-16 h-full min-h-screen w-full flex-1 overflow-hidden bg-slate-600 px-14 py-8 text-white">
      <div className="flex flex-wrap items-center justify-start gap-5 border-b-2 border-gray-800">
        <Header
          title="Lists"
          subtitle="Organize, Track, and Explore Your Lists with Ease"
        />
        <CreateListModal {...listModal} />
        <CreateListModal selectedListId={selectedListId} {...itemModal} />
        <MyBtn variant="gradient" onClick={() => listModal.onOpen()}>
          Create new List
        </MyBtn>
        {selectedList && (
          <>
            <MyBtn onClick={() => itemModal.onOpen()}>
              Create new item for
            </MyBtn>
            <MyBtn onClick={() => itemModal.onOpen()}>
              Create new item for
            </MyBtn>
            <MyBtn onClick={() => itemModal.onOpen()}>
              Create new item for
            </MyBtn>
            {/* <MyBtn onClick={handleDeleteList}>Delete this list</MyBtn> */}
            {/* <MyBtn onClick={handleDeleteItem}>Delete item from list</MyBtn> */}
          </>
        )}
      </div>
      <div className="p-4">
        <select
          name="list"
          id="list"
          className="mb-4 rounded-md border bg-slate-600 p-2"
          onChange={handleSelectChange}
        >
          <option className="bg-slate-400" value="">
            Select a list
          </option>
          {listData?.map((list: any) => (
            <option className="bg-slate-400" key={list._id} value={list._id}>
              {list.title}
            </option>
          ))}
        </select>

        <div className="mt-4">
          {selectedList ? (
            <>
              <div className="space-y-2 pl-5">
                {selectedList.items.length !== 0 ? (
                  selectedList.items.map((item: any) => (
                    <div
                      className={`flex justify-between rounded-lg border-l-[20px] p-4 text-2xl shadow-md transition-colors ${item.completed ? "border-slate-600 text-gray-500 line-through" : "border-slate-400 bg-slate-400 hover:border-slate-600 hover:bg-slate-600"} `}
                      key={item._id}
                    >
                      <span>{item.name}</span>
                      <div className="flex gap-8">
                        <button
                          onClick={() => {
                            handleDeleteItem.mutate({
                              listId: selectedListId as string,
                              itemId: item._id,
                            });
                          }}
                        >
                          <FaDeleteLeft />
                        </button>
                        <button
                          onClick={() =>
                            handleCompleteItem.mutate({
                              listId: selectedListId as string,
                              itemId: item._id,
                            })
                          }
                        >
                          <AiFillCheckSquare />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-3xl">
                    Add new item for this list
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-4xl">
              Select a list to view its items.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;
