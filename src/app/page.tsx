"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux-toolkit/store";
import {
  decrement,
  increment,
  setByValue,
} from "../../redux-toolkit/slices/counterSlice";
const webSocket = new WebSocket("ws://localhost:8080/");

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  webSocket.onmessage = (event) => {
    // console.log({ event });
    // document.getElementById("messages").innerHTML +=
    //   "Message from server: " + event.data + "<br>";

    // const message = event.data;
    const data = JSON.parse(event.data);

    const { send } = data;

    console.log({ message: JSON.parse(event.data) });

    console.log({ remoteApp: +send });
    dispatch(setByValue(+send));
    // Dispatch relevant Redux actions based on the received message
    // dispatch(increment());
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Remote APP
      <h2 className="text-3xl">
        Counter value: {Number.isNaN(count) ? 0 : count}
      </h2>
      <button onClick={() => dispatch(decrement())}>Decrement Count</button>
    </main>
  );
}
