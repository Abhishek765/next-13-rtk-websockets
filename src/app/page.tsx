"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux-toolkit/store";
import { incrementByAmount } from "../../redux-toolkit/slices/counterSlice";
import { useEffect } from "react";
const webSocket = new WebSocket("ws://localhost:8080/");

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  // Capturing the state
  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const { send } = data;

    console.log({ message: JSON.parse(event.data) });

    console.log({ HostApp: +send });
  };

  useEffect(() => {
    if (webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(`${count}`);
    }
  }, [count]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Host APP
      <h2 className="text-3xl">
        Counter value: {Number.isNaN(count) ? 0 : count}
      </h2>
      <button
        onClick={() => {
          dispatch(incrementByAmount(10));
        }}
      >
        Increment Count
      </button>
    </main>
  );
}
