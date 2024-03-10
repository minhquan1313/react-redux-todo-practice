import { editTodo } from "@/redux/Slice/todoListSlice";
import { TPriority } from "@/type/TPriority";
import { TTodoItem } from "@/type/TTodoItem";
import { UpCircleOutlined } from "@ant-design/icons";
import anime, { AnimeInstance } from "animejs";
import { Button, Checkbox, Space, Tag, theme } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const priorityColorMapping: {
  [K in TPriority]: string;
} = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};
type TMyAnimeInstance = AnimeInstance & { remove?: (ele: string | HTMLElement) => void };

interface PropsTodo {
  todo: TTodoItem;
}

export default function Todo({ todo }: PropsTodo) {
  const { name, priority, completed } = todo;

  const {
    token: { colorBgContainer: colorBg },
  } = theme.useToken();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(completed);

  const hover2 = useRef(false);
  const movableIsMoving = useRef(false);
  const movableAtEdge = useRef(false);
  const coord = useRef({ x: -1, y: -1 });
  const maskBtnRef = useRef<HTMLDivElement>(null);
  const moveableEleRef = useRef<HTMLDivElement>(null);
  const animeRef = useRef<TMyAnimeInstance>();

  const handleCheckedChange = () => {
    if (movableIsMoving.current) {
      movableIsMoving.current = false;
      return;
    }

    setChecked(!checked);
    dispatch(editTodo({ ...todo, completed: !checked }));
  };

  useEffect(() => {
    // drag effect
    const mDown = (e: MouseEvent) => {
      animeRef.current && animeRef.current.remove?.("*");

      const { screenX, screenY } = e;
      // console.log(moveableEleRef.current?.offsetLeft);

      coord.current = { x: screenX - (moveableEleRef.current?.offsetLeft || 0), y: screenY };
      hover2.current = true;
    };
    const mUp = (e: MouseEvent) => {
      hover2.current = false;

      if (!movableIsMoving.current || !moveableEleRef.current) return;

      const { screenX, screenY } = e;
      const { x, y } = coord.current;
      const [oX, oY] = [screenX - x, screenY - y];
      const maskWidth = maskBtnRef.current?.clientWidth || 0;

      const diff = Math.abs(-oX - maskWidth);
      // console.log({ screenX, x, oX, maskWidth, diff });

      animeRef.current = anime({
        targets: moveableEleRef.current,
        left: movableAtEdge.current ? -maskWidth : 0,
        easing: "easeInOutQuad",
        duration: 1.5 * (movableAtEdge.current ? diff : -oX),
      });
    };
    const mMove = (e: MouseEvent) => {
      if (!hover2.current) return;

      const { x, y } = coord.current;
      const { screenX, screenY } = e;
      if (x !== screenX || y !== screenY) {
        movableIsMoving.current = true;
      }

      if (!moveableEleRef.current) return;

      const [oX, oY] = [screenX - x, screenY - y];
      const maskWidth = maskBtnRef.current?.clientWidth || 0;
      // console.log({ screenX, x, oX, maskWidth, dif: -oX - maskWidth });

      if (oX < 0) {
        moveableEleRef.current.style.left = `${oX}px`;

        if (oX < -maskWidth) {
          // console.log(`yea`);
          movableAtEdge.current = true;
        } else {
          movableAtEdge.current = false;
        }
      }
    };

    const mouseMoveable = moveableEleRef.current;
    mouseMoveable?.addEventListener("mousedown", mDown);
    window.addEventListener("mousemove", mMove);
    window.addEventListener("mouseup", mUp);

    return () => {
      mouseMoveable?.removeEventListener("mousedown", mDown);
      window.removeEventListener("mousemove", mMove);
      window.removeEventListener("mouseup", mUp);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        // marginBottom: 3,
        // paddingLeft: paddingContentHorizontal,
      }}
      // ref={moveableToggleEleRef}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          // left: hover ? -(maskBtnRef.current?.clientWidth || 0) : 0,

          backgroundColor: colorBg,
          padding: "0.25em 0",

          userSelect: "none",

          // transition: "300ms",
        }}
        ref={moveableEleRef}>
        <div onClick={handleCheckedChange} style={{ display: "flex", ...(checked ? { filter: "brightness(0.5)", textDecoration: "line-through" } : {}) }}>
          <Checkbox
            checked={checked}
            // onChange={handleCheckedChange}
            style={{
              display: "flex",
              width: "100%",
              pointerEvents: "none",
            }}>
            {name}
          </Checkbox>
          <Tag color={priorityColorMapping[priority]} style={{ marginLeft: "auto", pointerEvents: "none" }}>
            {priority}
          </Tag>
        </div>
      </div>

      {/* MASK TOGGLE */}
      {/* <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          backgroundColor: "red",
          zIndex: 3,
          opacity: 0,
          width: maskBtnRef.current?.clientWidth,
        }}>
        a
      </div> */}
      {/* MASK */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
        }}
        ref={maskBtnRef}>
        <Space.Compact
          style={{
            height: "100%",
          }}>
          <div />
          <Button
            type="default"
            style={{
              height: "100%",
              padding: 0,
              backgroundColor: "#13a8a8",
              zIndex: 0,
            }}
            icon={<UpCircleOutlined />}
          />
          <Button
            type="primary"
            style={{
              height: "100%",
              padding: 0,
              zIndex: 0,
            }}
            icon={<UpCircleOutlined />}
          />
          <Button
            type="primary"
            style={{
              height: "100%",
              padding: 0,
              zIndex: 0,
            }}
            icon={<UpCircleOutlined />}
          />
        </Space.Compact>
      </div>
    </div>
  );
}
