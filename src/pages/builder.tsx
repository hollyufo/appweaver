import React, { useState, useEffect, useCallback, useRef } from "react";
import { openai } from "../lib/openai";
import { uploadStrings } from "../lib/appwritelib.js";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaGithub, FaTwitterSquare } from "react-icons/fa";
import Dashboard from "./Dashboard";
import { Send, Loader2, ExternalLink, ChevronDown, User, Bot } from "lucide-react";

// Define types for state variables
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Builder() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [changeExplanation, setChangeExplanation] = useState<string>("");
  const [mode, setMode] = useState<string>("web");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [usemode, setUsemode] = useState<boolean>(true);
  const [uniqueId, setUniqueId] = useState<string>("");
  const [deployed, setDeployed] = useState<boolean>(false);
  const [currentDeployId, setCurrentDeployId] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      const newMessage = { role: "user", content: prompt };
      const updatedChatHistory = [...chatHistory, newMessage];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: generateSystemMessage() }, ...updatedChatHistory],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const completion2 = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: generateExplanationMessage() }, ...updatedChatHistory],
        temperature: 0.5,
        max_tokens: 1500,
      });

      const generatedCode = completion.choices[0].message.content;
      const explanation = completion2.choices[0].message.content;

      if (generatedCode) {
        setPreview(generateEnhancedCode(generatedCode));
        setChangeExplanation(explanation);
        setChatHistory([
          ...updatedChatHistory,
          { role: "assistant", content: generatedCode },
        ]);
        setPrompt(""); // Clear input after submission
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
      await uploadStrings(preview, TitleValue, uniqueId);
      alert(`Your project has been deployed successfully! View it at: https://www.appweaver.xyz/preview/${uniqueId}`);
      setCurrentDeployId(uniqueId);
      setDeployed(true);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

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

  return (
    <div className="flex h-screen text-[#65686b] overflow-hidden" style={{ backgroundImage: 'url("/b2.png")', backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <section className="w-full flex flex-col border-[#95cb63]/30 backdrop-blur-xs space-y-6">
        <Header mode={mode} toggleDropdown={toggleDropdown} isOpen={isOpen} handleModeChange={handleModeChange} setMenuOpen={setMenuOpen} />
        <div className="flex h-screen">
          <ChatSection chatHistory={chatHistory} changeExplanation={changeExplanation} handleSubmit={handleSubmit} isLoading={isLoading} prompt={prompt} setPrompt={setPrompt} />
          <PreviewSection preview={preview} deployed={deployed} handleDeploy={handleDeploy} currentDeployId={currentDeployId} />
        </div>
      </section>
    </div>
  );
}

function generateSystemMessage() {
  return `
    You are an expert ${mode} developer specializing in creating visually stunning, modern websites.
    - Use Tailwind CSS for styling, employing elegant color schemes and cutting-edge design patterns.
    - Embed JavaScript at the end of the body to enhance functionality.
    - Implement smooth animations and transitions.
    - Use semantic HTML elements and error handling.
    - Don't start the code with backticks or markdown.
  `;
}

function generateExplanationMessage() {
  return `
    Without writing the code, explain what changed between these 2 versions very briefly (max 200 characters).
  `;
}

function generateEnhancedCode(generatedCode: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: { colors: { primary: '#0070f3', secondary: '#7928ca' } }
          }
        };
      </script>
      ${generatedCode.includes("<head>") ? generatedCode.split("<head>")[1].split("</head>")[0] : ""}
    </head>
    <body>
      ${generatedCode.includes("<body>") ? generatedCode.split("<body>")[1].split("</body>")[0] : generatedCode}
    </body>
    </html>
  `;
}

function generateUniqueId() {
  return ID.unique(6);
}
