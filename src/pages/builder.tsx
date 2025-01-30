import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Loader2,
  ExternalLink,
  User,
  Bot,
  ChevronDown,
} from "lucide-react";
import { openai } from "../lib/openai";
import { uploadStrings } from "../lib/appwritelib.js";
import { ID } from "appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaGithub, FaTwitterSquare } from "react-icons/fa";
import Dashboard from "./Dashboard.js";
export default function Builder() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [changeExplanation, setChangeExplanation] = useState<string>(""); // State for change explanations
  const [isOpen, setIsOpen] = useState(false);
  const [TitleValue, setTitleValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [deployed, setdeployed] = useState(false);
  const [mode, setMode] = useState<string>("web");
  const [currentdeployid, setcurrentdeployid] = useState("");
  const [usemode, setusemode] = useState(true);
  const displaymode =
    mode === "web"
      ? "Web Development 🌐"
      : mode === "dapp"
      ? "Dapp Coder 🪙"
      : mode === "game"
      ? "Game Development 🎲"
      : "Unknown Mode";

  const handleModeChange = (selectedMode: string) => {
    setMode(selectedMode);
    setIsOpen(false); // Close the dropdown after selecting a mode
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      const newMessage = { role: "user", content: prompt };
      const updatedChatHistory = [...chatHistory, newMessage];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert ${mode} developer specializing in creating visually stunning, modern websites.
          
          Guidelines for generation:
          1. Always include a complete HTML structure with a focus on visual aesthetics.
          2. Use Tailwind CSS for styling, employing elegant color schemes and cutting-edge design patterns.
          3. Embed JavaScript within a <script> tag at the end of the body to enhance functionality.
          4. Ensure all JavaScript is properly scoped using modern ES6+ syntax, avoiding the use of alert functions.
          5. Implement smooth animations and transitions to enrich user experience.
          6. Include effective event handling and DOM manipulation to support interactivity.
          7. Design responsively to accommodate all screen sizes seamlessly.
          8. Utilize semantic HTML elements to improve accessibility and SEO.
          9. do not start the code with triple back tick html. 
          10. Incorporate error handling within JavaScript code to maintain robustness.
      
          Deliver ONLY the complete HTML code with embedded CSS and JavaScript. No explanations or markdown.`,
          },
          ...updatedChatHistory,
        ],

        temperature: 0.7,
        max_tokens: 4000,
      });

      const completion2 = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `WITHOUT WRITING THE CODE WHILE STILL ONLY MENTIONING THE TECHNICAL CHANGES : explain what changed between these 2 codes very shortly in words and NOT code , if there is no previous code then explain what just got generated to the user. dont go above 200 characters in your explanation, preferably less.: `,
          },
          ...updatedChatHistory,
        ],
        temperature: 0.5,
        max_tokens: 1500,
      });

      const generatedCode = completion.choices[0].message.content;
      const generatedmessage = completion2.choices[0].message.content;

      if (generatedCode) {
        const enhancedCode = `
         <!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <script src="https://cdn.tailwindcss.com"></script>
             <script>
               tailwind.config = {
                 theme: {
                   extend: {
                     colors: {
                       primary: '#0070f3',
                       secondary: '#7928ca',
                     },
                   },
                 }
               }
             </script>
             ${
               generatedCode.includes("<head>")
                 ? generatedCode.split("<head>")[1].split("</head>")[0]
                 : ""
             }
         </head>
         <body>
             ${
               generatedCode.includes("<body>")
                 ? generatedCode.split("<body>")[1].split("</body>")[0]
                 : generatedCode
             }
         </body>
         </html>
       `;
        if (generatedmessage !== null) {
          setChangeExplanation(generatedmessage);
        }

        setPreview(enhancedCode);
        setChatHistory([
          ...updatedChatHistory,
          { role: "assistant", content: generatedCode },
        ]);

        setPrompt(""); // Clear input after submission
      }
    } catch (error) {
      console.error("Error generating website:", error);
      alert(
        "Error generating website. Please check your API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(preview);

  const handleClickOutside = (event: MouseEvent) => {
    // TypeScript now knows that dropdownRef.current is possibly an HTMLDivElement
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const id = ID.unique(6);
    setUniqueId(id);
  }, []);
  function handleDeploy() {
    uploadStrings(preview, TitleValue, uniqueId)
      .then((response) => {
        console.log("Upload successful:", response);
        alert(
          `Your project has been deployed successfully!, Please view it on https://www.appweaver.xyz/preview/${uniqueId}`
        );
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
    setcurrentdeployid(uniqueId);
    setdeployed(true);
    console.log("Deploying your project...");
  }

  return (
    <>
      {" "}
      <div
  className={`flex ${usemode ? 'h-screen' : 'h-full'} text-[#65686b] overflow-hidden`}
  style={{
          backgroundImage: 'url("/b2.png")',
          backgroundSize: "cover", // Adjusts the size of the background image
          backgroundPosition: "center", // Centers the background image
          backgroundRepeat: "no-repeat", // Prevents the background image from repeating
        }}
      >
        {/* Your content here */}

        {/* Design Interface - Left Panel */}
        <section className="w-full md:w-5/5 flex flex-col   border-[#95cb63]/30 backdrop-blur-xs space-y-6">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-[#95cb63]/30">
            {/* Logo */}
            <img
              src="/logo_text.png"
              alt="Appweaver"
              className="h-14  transition-all duration-500 filter  "
            />

            {/* Menu Button for Mobile */}
            <button
              className="md:hidden text-[#65686b]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars size={24} />
            </button>

            {/* Full Menu for Larger Screens */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  className="bg-[#95cb63] flex flex-row  text-[#11151a] px-4 py-2 text-xl  border-[1px] border-white  focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  Github <FaGithub className="my-auto mx-2" size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  className="bg-[#95cb63] flex flex-row  text-[#11151a] px-4 py-2 text-xl  border-[1px] border-white  focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  <img
                    src="/x.png"
                    alt="Twitter Logo"
                    className="w-4 filter my-auto mx-2 invert"
                  />
                </motion.button>
              </div>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  className="bg-[#95cb63] text-[#11151a] px-4 py-2 text-xl  border-[1px] border-white  focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  {mode} Developer Mode{" "}
                  <ChevronDown className="inline-block ml-2" size={16} />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setusemode(!usemode)}
                  className="border-2 text-xl mx-2 border-[#95cb63] bg-transparent text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  {usemode ? "Create" : "Explore"}
                </motion.a>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute mt-2 w-48 bg-[#11151a] rounded-md shadow-lg z-10"
                    >
                      {["web", "dapp", "game"].map((mode) => (
                        <motion.div
                          key={mode}
                          whileHover={{
                            backgroundColor: "rgba(149, 203, 99, 0.1)",
                          }}
                          className="px-4 py-2 cursor-pointer text-[#65686b] hover:text-[#95cb63]"
                          onClick={() => handleModeChange(mode)}
                        >
                          {mode === "web"
                            ? "🌐"
                            : mode === "dapp"
                            ? "🪙"
                            : "🎲"}{" "}
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>
          {/* Dropdown Menu for Mobile */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 md:hidden"
              >
                <div className="flex flex-col items-center mt-4 gap-4">
                  <div className="flex flex-col gap-2">
                  <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  className="bg-[#95cb63] flex flex-row  text-[#11151a] px-4 py-2 text-xl  border-[1px] border-white  focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  Github <FaGithub className="my-auto mx-2" size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDropdown}
                  className="bg-[#95cb63] flex flex-row  text-[#11151a] px-4 py-2 text-xl  border-[1px] border-white  focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  <img
                    src="/x.png"
                    alt="Twitter Logo"
                    className="w-4 filter my-auto mx-2 invert"
                  />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setusemode(!usemode)}
                  className="border-2 text-xl mx-2 border-[#95cb63] bg-transparent text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                >
                  {usemode ? "Create" : "Explore"}
                </motion.a>
                  </div>
                
                  <div className="relative">
                   
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10"
                        >
                          {["web", "dapp", "game"].map((mode) => (
                            <motion.div
                              key={mode}
                              whileHover={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                              }}
                              className="px-4 py-2 cursor-pointer"
                              onClick={() => handleModeChange(mode)}
                            >
                              {mode === "web"
                                ? "🌐"
                                : mode === "dapp"
                                ? "🪙"
                                : "🎲"}{" "}
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        {usemode ?<div>
            <div className=" flex    h-screen  sm:h-3/5 flex-row">
              <div className="flex-grow overflow-y-auto mx-auto p-4 custom-scrollbar">
                <AnimatePresence>
                  {chatHistory.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mb-4 p-4 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-[#86c34d]   ml-12"
                          : "bg-[#65686b]/10 mr-12"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {msg.role === "user" ? (
                          <User size={24} className="text-black" />
                        ) : (
                          <Bot size={24} className="text-white" />
                        )}
                        <span
                          className={`font-medium ${
                            msg.role === "user" ? "text-black" : "text-white"
                          }`}
                        >
                          {msg.role === "user" ? "You" : "AI Assistant"}
                        </span>
                      </div>
                      <p
                        className={
                          msg.role === "user" ? "text-black" : "text-white"
                        }
                      >
                        {msg.role === "user" ? msg.content : changeExplanation}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <section className="hidden md:block w-2/5  mx-2    relative bg-[#11151a] shadow-2xl overflow-hidden">
                <iframe
                  srcDoc={
                    preview ||
                    `
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { background-color: #11151a; color: #65686b; font-family: Arial, sans-serif; }
                  .pulse { animation: pulse 2s infinite; }
                  @keyframes pulse { 0% { transform: scale(0.95); } 50% { transform: scale(1.05); } 100% { transform: scale(0.95); } }
                </style>
              </head>
              <body class="h-screen flex items-center justify-center">
                <div class="text-center space-y-4">
                  <div class="w-16 h-16 mx-auto bg-[#95cb63] rounded-full pulse"></div>
                  <p class="text-xl font-medium">Your creation will appear here</p>
                  <p class="text-sm">Start by describing your vision</p>
                </div>
              </body>
            </html>
          `
                  }
                  className="w-[500px] h-[500px] bg-transparent border-none"
                  title="Website Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
                {preview && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#11151a] border-t border-[#95cb63]/30 flex items-center">
                    <input
                      type="text"
                      value={TitleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      placeholder="Name your project..."
                      className="flex-grow p-2 bg-[#11151a] text-white  focus:outline-none focus:ring-2 focus:ring-[#95cb63]/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDeploy}
                      className="bg-[#95cb63] flex flex-row text-[#11151a] px-4 py-2 text-xl border-[1px]  focus:outline-none focus:ring-2 focus:ring-[#95cb63] focus:ring-opacity-50 transition-all duration-300"
                    >
                      Deploy
                    </motion.button>
                  </div>
                )}
              </section>

              {/* Chat History */}
            </div>

            {/* Input Interface */}

            <form
              onSubmit={handleSubmit}
              className=" absolute bottom-0 w-full p-4 space-y-4"
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Make a change or build it new..."
                className="w-full p-4 bg-[#11151a]  border border-[#95cb63]/30 focus:border-[#95cb63] focus:ring-2 focus:ring-[#95cb63]/50 resize-none transition-all duration-300 text-white"
                rows={3}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full py-3 bg-[#95cb63] text-[#11151a]  font-medium flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                  <Send className="mr-2" size={20} />
                )}
                {isLoading ? "Generating..." : "Generate"}
              </motion.button>
              <div className="flex justify-between items-center mt-2">
                {deployed && (
                  <motion.a
                    href={`/preview/${currentdeployid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-[#95cb63] hover:text-[#65686b] flex items-center"
                  >
                    View Current Deploy{" "}
                    <ExternalLink className="ml-1" size={16} />
                  </motion.a>
                )}
              </div>
            </form>
          </div> : <Dashboard/>}  
        </section>

        {/* Preview Panel - Right Side */}
      </div>
    </>
  );
}
