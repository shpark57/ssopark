import React, { useState } from "react";
import './dragAndDrop.css'

const PHOTO_URL =
  "https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg";

export default function DragAndDrop(){
    // The content of the target box
    const [content, setContent] = useState<string>("Drop Something Here");
    // This function will be triggered when you start dragging
    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        data: string
        ) => {
            event.dataTransfer.setData("text", data);
        };

        // This function will be triggered when dropping
        const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const data = event.dataTransfer.getData("text");
            setContent(data);
        };

        // This makes the third box become droppable
        const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        };
        return (
            <div className="container">
                <div
                className="box1"
                onDragStart={(event) => dragStartHandler(event, PHOTO_URL)}
                draggable={true}
                >
                    <img src={PHOTO_URL} alt="Cute Dog" />
                </div>
                <div
                    className="box2"
                    onDragStart={(event) => dragStartHandler(event, "드래그앤드롭테스트")}
                    draggable={true}
                    >
                    <h2>드래그앤드롭테스트</h2>
                </div>

                <div className="box3" onDragOver={allowDrop} onDrop={dropHandler}>
                    {content.endsWith(".jpeg") ? <img src={content} /> : <h2>{content}</h2>}
                </div>
            </div>
        );
};
