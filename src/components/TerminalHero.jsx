import React, { useState, useEffect, useRef } from 'react';

const CMD_BLOCKS = [
    {
        prompt: '~/portfolio',
        cmd: 'whoami',
        output: [
            'Chetan Jadhav',
            'Full Stack | Cybersecurity | ML',
            'India'
        ],
        outputColor: 'rgba(255,255,255,0.7)',
    },
    {
        prompt: '~/portfolio',
        cmd: 'cat edu.md',
        output: [
            'B.E. Comp Eng — 3rd Year',
            'OPEN TO INTERNSHIPS'
        ],
        outputColor: '#00ff88',
    },
    {
        prompt: '~/portfolio',
        cmd: './tech-stack.sh',
        output: [
            '🛠 Languages: Java, Python, JS, C++',
            '🛠 Web: React, Node, Express, Tailwind',
            '🛠 Mobile/ML: Android, Firebase, TF, OpenCV',
            '🛠 Sec/DB: OWASP, Nmap, MongoDB, MySQL'
        ],
        outputColor: 'rgba(255,255,255,0.55)',
    },
    {
        prompt: '~/portfolio',
        cmd: 'ls expertise/',
        output: [
            '🚀 App Security',
            '🚀 Anomaly Systems',
            '🚀 API Architecture',
            '🚀 UI/UX Design'
        ],
        outputColor: '#00ff88',
    }
]

// Typing speeds
const CMD_SPEED = 40
const OUTPUT_SPEED = 10
const LINE_PAUSE = 100
const BLOCK_PAUSE = 400
const END_PAUSE = 2500

// ─── Component ─────────────────────────────────────────────────────────────
const TerminalHero = () => {
    const [cmdBlocks, setCmdBlocks] = useState([])
    const [activeCmd, setActiveCmd] = useState('')
    const [activeOutput, setActiveOutput] = useState([])

    const [loopCount, setLoopCount] = useState(1)
    const [blinkOn, setBlinkOn] = useState(true)
    const scrollRef = useRef(null)

    // Animation state ref to avoid closure issues
    const stateRef = useRef({
        phase: 'cmd',
        cmdIdx: 0,
        charIdx: 0,
        outputLineIdx: 0,
        outputCharIdx: 0,
        loop: 1
    })

    // Blink cursor
    useEffect(() => {
        const id = setInterval(() => setBlinkOn(v => !v), 530)
        return () => clearInterval(id)
    }, [])

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [cmdBlocks, activeCmd, activeOutput])

    useEffect(() => {
        let timeout

        const tick = () => {
            const s = stateRef.current

            // Phase 1: Typer
            if (s.phase === 'cmd') {
                const block = CMD_BLOCKS[s.cmdIdx]
                if (!block) {
                    timeout = setTimeout(() => {
                        setCmdBlocks([])
                        setActiveCmd('')
                        setActiveOutput([])
                        s.phase = 'cmd'
                        s.cmdIdx = 0
                        s.charIdx = 0
                        s.outputLineIdx = 0
                        s.outputCharIdx = 0
                        s.loop++
                        setLoopCount(s.loop)
                        timeout = setTimeout(tick, 500)
                    }, END_PAUSE)
                    return
                }

                if (s.charIdx < block.cmd.length) {
                    s.charIdx++
                    setActiveCmd(block.cmd.slice(0, s.charIdx))
                    timeout = setTimeout(tick, CMD_SPEED + Math.random() * 40 - 20)
                } else {
                    s.phase = 'output'
                    s.outputLineIdx = 0
                    s.outputCharIdx = 0
                    timeout = setTimeout(tick, LINE_PAUSE)
                }
                return
            }

            // Phase 2: Output lines
            if (s.phase === 'output') {
                const block = CMD_BLOCKS[s.cmdIdx]
                const line = block.output[s.outputLineIdx]

                if (line !== undefined) {
                    if (s.outputCharIdx < line.length) {
                        s.outputCharIdx++
                        const currentChars = line.slice(0, s.outputCharIdx)
                        setActiveOutput(prev => {
                            const newOut = [...prev]
                            newOut[s.outputLineIdx] = currentChars
                            return newOut
                        })
                        timeout = setTimeout(tick, OUTPUT_SPEED)
                    } else {
                        s.outputLineIdx++
                        s.outputCharIdx = 0
                        timeout = setTimeout(tick, LINE_PAUSE)
                    }
                } else {
                    // Block done
                    setCmdBlocks(prev => [...prev, {
                        prompt: block.prompt,
                        cmd: block.cmd,
                        output: [...block.output]
                    }])
                    setActiveCmd('')
                    setActiveOutput([])
                    s.cmdIdx++
                    s.charIdx = 0
                    s.phase = 'cmd'
                    timeout = setTimeout(tick, BLOCK_PAUSE)
                }
            }
        }

        timeout = setTimeout(tick, 1000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div
            className="w-full font-mono rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{
                background: 'rgba(6, 14, 6, 0.88)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0,255,136,0.15)',
                height: '520px',
                boxShadow: '0 0 80px rgba(0,255,136,0.08), inset 0 0 40px rgba(0,255,136,0.02)',
            }}
        >
            <div className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
                style={{ borderColor: 'rgba(0,255,136,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="ml-2 text-[10px] sm:text-xs tracking-widest uppercase opacity-40">
                    bash — chetan@portfolio: ~/portfolio
                </span>
                <span className="ml-auto text-[10px] opacity-25">
                    loop #{loopCount}
                </span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 text-[12px] sm:text-[13px] leading-relaxed"
                style={{ scrollbarWidth: 'none' }}
            >
                {cmdBlocks.map((b, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex gap-2">
                            <span className="text-[#00ff88] opacity-50">~ {b.prompt}</span>
                            <span className="text-white opacity-40">$</span>
                            <span className="text-white">{b.cmd}</span>
                        </div>
                        {b.output.map((line, j) => (
                            <div key={j} className="pl-4 mt-1 opacity-70 whitespace-pre-wrap"
                                style={{ color: i === 2 ? '#7ee787' : '#00ff88' }}>
                                {line}
                            </div>
                        ))}
                    </div>
                ))}

                {stateRef.current.cmdIdx < CMD_BLOCKS.length && (
                    <div className="mb-4">
                        <div className="flex gap-2">
                            <span className="text-[#00ff88] opacity-50">~ {CMD_BLOCKS[stateRef.current.cmdIdx].prompt}</span>
                            <span className="text-white opacity-40">$</span>
                            <span className="text-white">{activeCmd}</span>
                            {stateRef.current.phase === 'cmd' && (
                                <span className={`inline-block w-2 h-4 ml-0.5 bg-[#00ff88] ${blinkOn ? 'opacity-100' : 'opacity-0'}`} />
                            )}
                        </div>
                        {activeOutput.map((line, j) => (
                            <div key={j} className="pl-4 mt-1 opacity-70 whitespace-pre-wrap"
                                style={{ color: stateRef.current.cmdIdx === 2 ? '#7ee787' : '#00ff88' }}>
                                {line}{j === activeOutput.length - 1 && stateRef.current.phase === 'output' && (
                                    <span className={`inline-block w-2 h-4 ml-0.5 bg-[#00ff88] align-middle`} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 px-5 py-4 border-t"
                style={{ borderColor: 'rgba(0,255,136,0.1)', background: 'rgba(0,255,136,0.03)' }}
            >
                <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all hover:bg-[#00ff88]/10 hover:scale-105 border border-[#00ff88]/20 text-[#00ff88]"
                >
                    <span className="opacity-60 text-lg leading-none">▶</span> ./view-projects.sh
                </button>
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all hover:bg-white/5 hover:scale-105 border border-white/10 text-white/60"
                >
                    <span className="opacity-40 text-lg leading-none">$</span> ssh hire@chetan.dev
                </button>
            </div>
        </div>
    );
};

export default TerminalHero;
