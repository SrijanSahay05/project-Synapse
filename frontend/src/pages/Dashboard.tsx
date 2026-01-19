import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
    id: string;
    type: 'user' | 'system';
    content: string;
}

const Dashboard: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'system', content: "Hello! I'm your agentic task manager. Dump your tasks here, and I'll help you organize them." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isParsing, setIsParsing] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isParsing) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsParsing(true);

        try {
            // Stub for agentic logic backend call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const systemMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'system',
                content: "I've received your request and I'm processing it."
            };

            setMessages(prev => [...prev, systemMessage]);
        } catch (error) {
            console.error('Failed to process request', error);
        } finally {
            setIsParsing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6"
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`
              max-w-[80%] lg:max-w-[60%] rounded-2xl p-4
              ${message.type === 'user'
                                ? 'bg-neutral-900 text-white rounded-br-none'
                                : 'bg-neutral-50 text-neutral-800 rounded-bl-none border border-neutral-100'}
            `}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                    </div>
                ))}
                {isParsing && (
                    <div className="flex justify-start">
                        <div className="bg-neutral-50 border border-neutral-100 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                            <span className="text-sm text-neutral-500">Processing...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 lg:p-8 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto relative cursor-text group" onClick={() => document.getElementById('chat-input')?.focus()}>
                    <textarea
                        id="chat-input"
                        rows={1}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Dump your tasks here..."
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 resize-none transition-all placeholder-neutral-400 text-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isParsing}
                        className="absolute right-3 bottom-3 p-2 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isParsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                    <div className="absolute -top-3 left-4 px-2 bg-white text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Agentic Input
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
