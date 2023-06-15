# Realtime Redux Store state updates across multiple repos using Websockets -> This is Inspired from pub/sub pattern

Repo Details:

- node-websocket -> backend service (for handling the updates across the applications)
- [next-rtk-web-host-app](https://github.com/Abhishek765/next-13-rtk-websockets/tree/host-app) -> Host APP (modifying the counterstate in the store)
- [next-rtk-web-remote-app](https://github.com/Abhishek765/next-13-rtk-websockets/tree/remote-app) -> Remote APP (Consumes the counterstate and renders the same as JSX)

PS: We can easily convert this into a two-way real-time communication
