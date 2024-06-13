import { css } from "@emotion/css";
import { Button } from "./ui/button";
import chroma from "chroma-js";
import { useMemo, useRef } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";

export default function ColorSelector({
  value,
  setValue,
  lock,
  setLock,
}: {
  value: string;
  setValue: (value: string) => void;
  lock: boolean;
  setLock: (lock: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const color = useMemo(() => chroma(value), [value]);
  const isDark = useMemo(() => color.luminance() < 0.5, [color]);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        transform-origin: 20% 50%;
        transition: scale ease 0.2s;
        scale: ${lock ? 0.95 : 1};
        flex: 1;
      `}
    >
      <Button
        variant={lock ? "default" : "secondary"}
        size="icon"
        className={css`
          border-bottom-right-radius: 0;
          border-top-right-radius: 0;
        `}
        onClick={() => {
          setLock(!lock);
        }}
      >
        {lock ? <FiLock /> : <FiUnlock />}
      </Button>
      <div
        className={css`
          position: relative;
          display: flex;
          flex-direction: row;
          flex: 1;
        `}
      >
        <Button
          className={css`
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            background-color: ${value};
            color: ${isDark ? "white" : "black"};
            width: 5rem;
            flex: 1;
            &:hover {
              background-color: ${color.alpha(0.8).css()};
            }
          `}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          {value}
        </Button>
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={css`
            position: absolute;
            bottom: -0.2rem;
            left: 0;
            opacity: 0;
            pointer-events: none;
          `}
        />
      </div>
    </div>
  );
}
