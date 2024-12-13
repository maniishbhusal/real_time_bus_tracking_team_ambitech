import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (hubUrl) => {
  const connectionRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true; // think of it as a "component alive" flag. It's like a shop's "OPEN/CLOSED" sign.

    // Think of reconnectTimer as a "retry alarm clock". It's like setting a reminder to try again later.
    let reconnectTimer = null; // No alarm set initially

    const createConnection = () => {
      if (!connectionRef.current) {
        connectionRef.current = new signalR.HubConnectionBuilder()
          .withUrl(hubUrl)
          .withAutomaticReconnect([0, 1000, 5000, 10000]) // More aggressive reconnection
          .configureLogging(signalR.LogLevel.Information)
          .build();

        connectionRef.current.onclose(() => {
          // Only update if shop is still OPEN
          if (mounted) {
            setIsConnected(false);
            console.log("SignalR Disconnected");
            // Attempt to reconnect immediately
            startConnection();
          }
        });
      }
    };
    

    const startConnection = async () => {
      try {
        if (
          connectionRef.current?.state ===
          signalR.HubConnectionState.Disconnected
        ) {
          await connectionRef.current.start();
          if (mounted) {
            setIsConnected(true);
            setError(null);
            console.log("SignalR Connected");
          }
        }
      } catch (err) {
        if (mounted) {
          // Only show error if shop is still OPEN
          setError(err);
          setIsConnected(false);
          console.error("SignalR Connection Error:", err);
          // Clear any existing alarm
          if (reconnectTimer) clearTimeout(reconnectTimer);
          // Set new alarm to try again in 5 seconds
          reconnectTimer = setTimeout(startConnection, 5000);
        }
      }
    };

    createConnection();
    startConnection();

    // When component unmounts (shop closes)
    return () => {
      mounted = false; // Shop is now CLOSED
      if (reconnectTimer) clearTimeout(reconnectTimer); // Cancel any pending alarms
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, [hubUrl]);

  return {
    connection: connectionRef.current,
    isConnected,
    error,
    subscribe: (methodName, callback) => {
      if (connectionRef.current) {
        connectionRef.current.on(methodName, callback);
      }
    },
    unsubscribe: (methodName) => {
      if (connectionRef.current) {
        connectionRef.current.off(methodName);
      }
    },
  };
};
