"use client";

import { useConversation } from "@11labs/react";
import { useCallback } from "react";

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: "0rEm8DBlSWktC0TPdXK1", // Replace with your agent ID
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  // Convenience booleans for orb logic
  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* ORB SECTION */}
      <div
        className={`
          orb my-16 mx-12
          ${isSpeaking ? "animate-orb" : isConnected ? "animate-orb-slow" : ""}
          ${isConnected ? "orb-active" : "orb-inactive"}
        `}
      />

      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={isConnected}
          className="px-4 py-2 bg-pink-500 text-white rounded disabled:bg-gray-300"
        >
          Click to Start
        </button>
        <button
          onClick={stopConversation}
          disabled={!isConnected}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          End Conversation
        </button>
      </div>

      {/* STATUS */}
      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Your coach is {isSpeaking ? "speaking" : "ready"}</p>
      </div>
    </div>
  );
}
