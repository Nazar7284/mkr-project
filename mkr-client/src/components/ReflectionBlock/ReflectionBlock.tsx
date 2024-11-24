import React, { useState, useEffect, useMemo } from "react";
import { Rnd } from "react-rnd";
import { ImCross } from "react-icons/im";
import { IBlock } from "src/types/block";

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

  const addBlock = () => {
    const newBlock: IBlock = {
      id: Date.now(),
      content: "",
      title: "Title",
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      zIndex: highestZIndex + 1,
    };
    setBlocks([...blocks, newBlock]);
    setHighestZIndex(highestZIndex + 1);
  };

  const updateBlockPosition = (
    id: number,
    newPosition: { x: number; y: number }
  ) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              x: Math.max(
                0,
                Math.min(newPosition.x, window.innerWidth - block.width)
              ),
              y: Math.max(
                0,
                Math.min(newPosition.y, window.innerHeight - block.height)
              ),
            }
          : block
      )
    );
  };

  const updateBlockSize = (
    id: number,
    newSize: { width: number; height: number }
  ) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              width: newSize.width,
              height: newSize.height,
            }
          : block
      )
    );
  };

  const bringToFront = (id: number) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, zIndex: highestZIndex + 1 } : block
      )
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
          className="relative shadow-md bg-gray-100 border border-gray-400"
        >
          <div className="w-full h-full bg-white relative rounded-lg p-2 shadow-lg min-h-[100px] min-w-[200px] overflow-hidden">
            <div className="border-b-2 border-gray-300 flex justify-between items-center pb-1 mb-2">
              <div className="text-gray-700 font-semibold">{block.title}</div>
              <button
                onClick={() =>
                  setBlocks(blocks.filter((b) => b.id !== block.id))
                }
              >
                <ImCross color="black" />
              </button>
            </div>
            <div
              className={`h-[${block.height}px - 60px] text-gray-600 overflow-y-scroll no-scrollbar`}
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="border-b-2">{block.content}</div>
            </div>
          </div>
        </Rnd>
      )),
    [blocks]
  );

  return (
    <div>
      <button
        onClick={addBlock}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Додати нотатку
      </button>
      <div className="relative w-full h-[calc(100vh-250px)] border border-black overflow-hidden">
        {renderedBlocks}
      </div>
    </div>
  );
};

export default ReflectionBlock;
