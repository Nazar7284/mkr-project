import React, { useState, useEffect, useMemo } from "react";
import { Rnd } from "react-rnd";
import { ImCross } from "react-icons/im";
import { IBlock } from "src/types/block";
import MyBtn from "../Button";
import useModal from "src/hooks/useModal";
import CreateNoteModal from "src/ui/CreateNoteModal";

const ReflectionBlock: React.FC = () => {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [highestZIndex, setHighestZIndex] = useState<number>(5);

  useEffect(() => {
    const savedBlocks = localStorage.getItem("blocks");
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  const addBlock = (title: string, content: string) => {
    const newBlock: IBlock = {
      id: Date.now(),
      content,
      title,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      zIndex: highestZIndex + 1,
    };
    setBlocks([...blocks, newBlock]);
    setHighestZIndex(highestZIndex + 1);
    modalProps.onClose();
  };

  const updateBlockPosition = (
    id: number,
    newPosition: { x: number; y: number },
  ) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              x: Math.max(
                0,
                Math.min(newPosition.x, window.innerWidth - block.width),
              ),
              y: Math.max(
                0,
                Math.min(newPosition.y, window.innerHeight - block.height),
              ),
            }
          : block,
      ),
    );
  };

  const updateBlockSize = (
    id: number,
    newSize: { width: number; height: number },
  ) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              width: newSize.width,
              height: newSize.height,
            }
          : block,
      ),
    );
  };

  const bringToFront = (id: number) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, zIndex: highestZIndex + 1 } : block,
      ),
    );
    setHighestZIndex((prev) => prev + 1);
  };

  const renderedBlocks = useMemo(
    () =>
      blocks.map((block) => (
        <Rnd
          key={block.id}
          size={{ width: block.width, height: block.height }}
          position={{ x: block.x, y: block.y }}
          onDragStart={() => bringToFront(block.id)}
          onDragStop={(e, d) =>
            updateBlockPosition(block.id, { x: d.x, y: d.y })
          }
          onResizeStop={(e, direction, ref, delta, position) => {
            updateBlockPosition(block.id, position);
            updateBlockSize(block.id, {
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
            });
          }}
          onMouseDown={() => bringToFront(block.id)}
          bounds="parent"
          style={{
            zIndex: block.zIndex,
            borderRadius: "8px",
          }}
          className="relative border border-gray-400 bg-gray-100 shadow-md"
        >
          <div className="relative h-full min-h-[100px] w-full min-w-[200px] overflow-hidden rounded-lg bg-white p-2 shadow-lg">
            <div className="mb-2 flex items-center justify-between border-b-2 border-gray-300 pb-1">
              <div className="font-semibold text-gray-700">{block.title}</div>
              <button
                onClick={() =>
                  setBlocks(blocks.filter((b) => b.id !== block.id))
                }
              >
                <ImCross color="black" />
              </button>
            </div>
            <div
              className={`h-[${block.height}px - 60px] no-scrollbar overflow-y-scroll text-gray-600`}
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="border-b-2">{block.content}</div>
            </div>
          </div>
        </Rnd>
      )),
    [blocks],
  );

  const modalProps = useModal();

  return (
    <div>
      <MyBtn onClick={modalProps.onOpen} className="my-4" variant={"gradient"}>
        Create note
      </MyBtn>
      <CreateNoteModal onComplete={addBlock} {...modalProps} />
      <div className="relative h-[calc(100vh-250px)] w-full overflow-hidden border border-black">
        {renderedBlocks}
      </div>
    </div>
  );
};

export default ReflectionBlock;
