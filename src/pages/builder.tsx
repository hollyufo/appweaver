import React, { useState, useEffect, useCallback, useRef } from "react";
import { openai } from "../lib/openai";
import { uploadStrings } from "../lib/appwritelib.js";
import { FaBars } from "react-icons/fa";
import { Send, Loader2 } from "lucide-react";

// Define types for state variables
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Builder() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [changeExplanation, setChangeExplanation] = useState("");
  const [mode, setMode] = useState("web");
  const [isOpen, setIsOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [deployed, setDeployed] = useState(false);
  const [currentDeployId, setCurrentDeployId] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUniqueId(generateUniqueId());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModeChange = useCallback((selectedMode: string) => {
    setMode(selectedMode);
    setIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);

    try {
      const updatedChatHistory = [...chatHistory, { role: "user", content: prompt }];
      
      const [completion, explanationResponse] = await Promise.all([
        openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "system", content: generateSystemMessage(mode) }, ...updatedChatHistory],
          temperature: 0.7,
          max_tokens: 4000,
        }),
        openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "system", content: generateExplanationMessage() }, ...updatedChatHistory],
          temperature: 0.5,
          max_tokens: 1500,
        })
      ]);
      
      const generatedCode = completion.choices[0]?.message?.content || "";
      const explanation = explanationResponse.choices[0]?.message?.content || "";

      if (generatedCode) {
        setPreview(generateEnhancedCode(generatedCode));
        setChangeExplanation(explanation);
        setChatHistory([...updatedChatHistory, { role: "assistant", content: generatedCode }]);
        setPrompt("");
      }
    } catch (error) {
      console.error("Error generating website:", error);
      alert("Error generating website. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    try {
      await uploadStrings(preview, "Generated Site", uniqueId);
      alert(`Your project has been deployed successfully! View it at: https://www.appweaver.xyz/preview/${uniqueId}`);
      setCurrentDeployId(uniqueId);
      setDeployed(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Deployment failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen text-[#65686b] overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/b2.png")' }}>
      <section className="w-full flex flex-col border-[#95cb63]/30 backdrop-blur-xs space-y-6">
        <Header mode={mode} toggleDropdown={toggleDropdown} isOpen={isOpen} handleModeChange={handleModeChange} />
        <div className="flex h-screen">
          <ChatSection chatHistory={chatHistory} changeExplanation={changeExplanation} handleSubmit={handleSubmit} isLoading={isLoading} prompt={prompt} setPrompt={setPrompt} />
          <PreviewSection preview={preview} deployed={deployed} handleDeploy={handleDeploy} currentDeployId={currentDeployId} />
        </div>
      </section>
    </div>
  );
}

// Helper Functions
function generateSystemMessage(mode: string) {
  return `You are an expert ${mode} developer. Use Tailwind CSS, smooth animations, and semantic HTML.`;
}

function generateExplanationMessage() {
  return "Explain in 200 characters or less what changed between the two versions.";
}

function generateEnhancedCode(generatedCode: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script></head><body>${generatedCode}</body></html>`;
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 8);
}
