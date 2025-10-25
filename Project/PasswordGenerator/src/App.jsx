import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");

  // Using ref hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const calculateStrength = useCallback((pass, len, hasNum, hasChar) => {
    let score = 0;
    if (len >= 12) score += 2;
    else if (len >= 8) score += 1;
    if (hasNum) score += 1;
    if (hasChar) score += 2;
    
    if (score <= 2) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  }, []);

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
    setStrength(calculateStrength(pass, length, numberAllowed, charAllowed));
  }, [length, numberAllowed, charAllowed, setPassword, calculateStrength]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const getStrengthColor = () => {
    if (strength === "weak") return "from-red-500 to-orange-500";
    if (strength === "medium") return "from-yellow-500 to-amber-500";
    return "from-green-500 to-emerald-500";
  };

  const getStrengthWidth = () => {
    if (strength === "weak") return "w-1/3";
    if (strength === "medium") return "w-2/3";
    return "w-full";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animated-gradient">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Password Generator
            </h1>
            <p className="text-gray-300 text-sm">Create secure passwords in seconds</p>
          </div>

          {/* Password Display */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={password}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white text-lg font-mono focus:outline-none focus:border-purple-400 transition-all duration-300 pr-32"
                placeholder="Your secure password"
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPasswordToClipboard}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </span>
                )}
              </button>
            </div>

            {/* Strength Indicator */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Password Strength</span>
                <span className={`text-sm font-semibold capitalize ${
                  strength === "weak" ? "text-red-400" :
                  strength === "medium" ? "text-yellow-400" : "text-green-400"
                }`}>
                  {strength}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getStrengthColor()} ${getStrengthWidth()} transition-all duration-500 rounded-full`}
                ></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Length Slider */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-white font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Password Length
                </label>
                <span className="text-2xl font-bold text-purple-400">{length}</span>
              </div>
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                onChange={(e) => setLength(e.target.value)}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>8</span>
                <span>50</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Numbers Toggle */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold">Numbers</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={numberAllowed}
                      id="numberInput"
                      className="sr-only"
                      onChange={() => setNumberAllowed((prev) => !prev)}
                    />
                    <div className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
                      numberAllowed ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/20"
                    }`}>
                      <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        numberAllowed ? "translate-x-6" : "translate-x-0"
                      }`}></div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Special Characters Toggle */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-300">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold">Special Chars</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={charAllowed}
                      id="charInput"
                      className="sr-only"
                      onChange={() => setCharAllowed((prev) => !prev)}
                    />
                    <div className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
                      charAllowed ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/20"
                    }`}>
                      <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        charAllowed ? "translate-x-6" : "translate-x-0"
                      }`}></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={passwordGenerator}
              className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate New Password
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">🔒 Your passwords are generated locally and never stored</p>
        </div>
      </div>
    </div>
  );
}

export default App;