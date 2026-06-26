import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function DocChat() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Upload a PDF to start asking questions about it." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    setPdfFile(file);
    setUploaded(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    try {
      const res = await fetch("http://localhost:3000/api/v1/ingest/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setUploaded(true);
        setMessages([
          { role: "assistant", text: `"${pdfFile.name}" is ready. Ask me anything about it.` },
        ]);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch {
      alert("Network error. Is the server running?");
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async () => {
    const msg = input.trim();
    console.log("final msg",msg )
    if (!msg || !uploaded) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/ingest/ask?msg=${encodeURIComponent(msg)}`
      );
      // const data : any= await res.text();
      const data =  await res.json();
      console.log(data.response);
      setMessages((prev) => [...prev, { role: "assistant", text: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <h1 className="text-base font-medium text-gray-900">DocChat</h1>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Beta</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 gap-4 shrink-0">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Source</p>

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors
              ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
          >
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-gray-500 text-center">Drop a PDF here</p>
            <p className="text-xs text-gray-400">or click to browse</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          {/* File preview */}
          {pdfFile && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
              <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">{pdfFile.name}</p>
                <p className="text-xs text-gray-400">{uploaded ? "Ready" : "Not uploaded"}</p>
              </div>
              {uploaded && (
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
          )}

          {/* Upload button */}
          {pdfFile && !uploaded && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {uploading ? "Uploading…" : "Upload PDF"}
            </button>
          )}

          {!pdfFile && (
            <p className="text-xs text-gray-400 text-center">
              Select a PDF to get started
            </p>
          )}
        </aside>

        {/* Chat area */}
        <main className="flex flex-col flex-1 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed overflow-x-auto
    ${
      msg.role === "user"
        ? "bg-blue-600 text-white rounded-br-sm"
        : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
    }`}
>
  {msg.role === "assistant" ? (
    <div
      className="
        prose
        prose-sm
        max-w-none

        prose-headings:mb-2
        prose-headings:mt-4

        prose-p:my-2

        prose-table:w-full
        prose-table:border-collapse

        prose-th:border
        prose-th:border-gray-300
        prose-th:bg-gray-100
        prose-th:p-2

        prose-td:border
        prose-td:border-gray-300
        prose-td:p-2

        prose-code:bg-gray-100
        prose-code:px-1
        prose-code:py-0.5
        prose-code:rounded

        prose-pre:bg-gray-900
        prose-pre:text-white
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {msg.text}
      </ReactMarkdown>
    </div>
  ) : (
    msg.text
  )}
</div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-gray-200 bg-white px-4 py-3 flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={uploaded ? "Ask anything about your PDF…" : "Upload a PDF first…"}
              disabled={!uploaded}
              rows={1}
              className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ maxHeight: "120px" }}
            />
            <button
              onClick={handleSend}
              disabled={!uploaded || !input.trim() || loading}
              className="shrink-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl w-10 h-10 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
