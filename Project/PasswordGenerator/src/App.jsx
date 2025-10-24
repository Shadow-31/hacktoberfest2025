import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck } from 'react-icons/fi';
import { FiPrinter } from 'react-icons/fi';
//import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Using ref hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*?~`";
    }

    // Using for loop to generate random Password
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div 
        className="h-[100vh] flex items-center justify-center "
        style={{
          backgroundImage: `url('/bgimage.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Main Card Container */}
        <div className="w-full max-w-md bg-gradient-to-br from-cyan-700/90 via-purple-700/90 to-blue-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform transition-all duration-300 hover:shadow-3xl">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Password Generator
            </h1>
            <p className="text-gray-300 text-xl mt-2">Create strong & secure passwords</p>
          </div>

          {/* Password Display Section */}
          <div className="mb-6">
            <div className="flex rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
              <input
                type="text"
                value={password}
                className="flex-1 outline-none py-4 px-4 bg-gray-800 text-white text-lg font-mono border-r border-gray-600"
                placeholder="Your password will appear here"
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPasswordToClipboard}
                className={`px-6 py-4 font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isCopied 
                    ? "bg-green-400 hover:bg-green-700" 
                    : "bg-gradient-to-r from-cyan-600 via-teal-400 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                }`}
              >
                {isCopied ? (
                  <>
                    <span><FiCheck/></span>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <span><FiPrinter/></span>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            {/* Length Slider */}
            <div className="bg-cyan-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-center mb-3">
                <label className="text-white text-xl font-semibold">Password Length</label>
                <span className="text-2xl font-bold text-white bg-cyan-600 px-3 py-1 rounded-lg">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <div className="flex justify-between text-xs text-white mt-1">
                <span>8</span>
                <span>50</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cyan-800/50 rounded-xl p-4 border border-gray-700/50 transition-all duration-300 hover:border-cyan-500/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={numberAllowed}
                      id="numberInput"
                      onChange={() => {
                        setNumberAllowed((prev) => !prev);
                      }}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded border-2 transition-all duration-300 ${
                      numberAllowed 
                        ? "bg-cyan-500 border-cyan-500" 
                        : "bg-gray-700 border-gray-600"
                    }`}>
                      {numberAllowed && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                          <FiCheck/>
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium">Include Numbers</span>
                </label>
              </div>

              <div className="bg-cyan-800/50 rounded-xl p-4 border border-gray-700/50 transition-all duration-300 hover:border-purple-500/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={charAllowed}
                      id="charInput"
                      onChange={() => {
                        setCharAllowed((prev) => !prev);
                      }}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded border-2 transition-all duration-300 ${
                      charAllowed 
                        ? "bg-purple-500 border-purple-500" 
                        : "bg-gray-700 border-gray-600"
                    }`}>
                      {charAllowed && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                          <FiCheck/>
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-white font-medium">Special Characters</span>
                </label>
              </div>
            </div>

            {/* Strength Indicator */}
            <div className="bg-cyan-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">Password Strength</span>
                <span className={`font-bold ${
                  length >= 16 && numberAllowed && charAllowed ? "text-green-400" :
                  length >= 12 && (numberAllowed || charAllowed) ? "text-yellow-400" :
                  "text-red-400"
                }`}>
                  {length >= 16 && numberAllowed && charAllowed ? "Strong" :
                   length >= 12 && (numberAllowed || charAllowed) ? "Medium" :
                   "Weak"}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    length >= 16 && numberAllowed && charAllowed ? "bg-green-500 w-full" :
                    length >= 12 && (numberAllowed || charAllowed) ? "bg-yellow-500 w-2/3" :
                    "bg-red-500 w-1/3"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;