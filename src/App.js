import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function Mouse(props) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  let throttle = true;
  const throttleMouse = (x, y) => {
    if (!throttle) return null;
    setMouse({ x: x, y: y });
    throttle = false;
    setTimeout(() => {
      throttle = true;
    }, 50);
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      throttleMouse(e.pageX, e.pageY);
    });
  }, []);

  return (
    <>
      <div
        className="mouse"
        style={{ top: `${mouse.y - 50}px`, left: `${mouse.x - 50}px` }}
      ></div>
      {props.render(mouse)}
    </>
  );
}

function Cat(props) {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [side, setSide] = useState({ left: true, front: true });
  let someRef = useRef();
  const chase = () => {
    setPosition({ x: props.mouse.x, y: props.mouse.y });
  };
  useEffect(() => {
    someRef.current.offsetLeft - 75 < props.mouse.x - 50
      ? setSide((side) => {
          return { ...side, left: true };
        })
      : setSide((side) => {
          return { ...side, left: false };
        });
    someRef.current.offsetTop < props.mouse.y - 50
      ? setSide((side) => {
          return { ...side, front: true };
        })
      : setSide((side) => {
          return { ...side, front: false };
        });
    chase();
  }, [props.mouse]);
  return (
    <div
      className={side.front ? ` cat cat__front` : `cat cat__rare`}
      ref={someRef}
      style={{
        top: `${position.y - 75}px`,
        left: `${position.x - 75}px`,
        ...(side.left ? { transform: `scaleX(-1)` } : { transform: `none` }),
      }}
    ></div>
  );
}

function App() {
  return (
    <div className="app">
      <Mouse render={(mouse) => <Cat mouse={mouse} />} />
    </div>
  );
}

export default App;
