'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SEVEN_HABITS = [
    {
        number: 1,
        title: "Habit 1: Be Proactive",
        description: "Take responsibility for your life. Focus on what you can control and influence. Don't blame circumstances or others. Your choices determine your responses. Between stimulus and response lies your freedom to choose."
    },
    {
        number: 2,
        title: "Habit 2: Begin with the End in Mind",
        description: "Define clear goals and measures of success. Create a personal mission statement. Envision what you want to become. Live with purpose and intention. All things are created twice - first mentally, then physically."
    },
    {
        number: 3,
        title: "Habit 3: Put First Things First",
        description: "Prioritize important over urgent tasks. Focus on activities that align with your goals. Manage time based on priorities, not just schedules. Say no to the unimportant. Effective management is discipline."
    },
    {
        number: 4,
        title: "Habit 4: Think Win-Win",
        description: "Seek mutual benefit in all interactions. Life is cooperative, not competitive. Build relationships based on trust and abundance. Both parties can succeed. Win-Win or No Deal is the highest form of negotiation."
    },
    {
        number: 5,
        title: "Habit 5: Seek First to Understand, Then to Be Understood",
        description: "Listen with empathy before speaking. Understand others' perspectives deeply. Diagnose before you prescribe. When people feel understood, they become more open to influence. Empathic listening builds trust."
    },
    {
        number: 6,
        title: "Habit 6: Synergize",
        description: "Value differences and work together creatively. The whole is greater than the sum of its parts. Embrace diverse perspectives to find better solutions. Teamwork produces better results than individual effort. Unity is strength."
    },
    {
        number: 7,
        title: "Habit 7: Sharpen the Saw",
        description: "Regularly renew yourself in four areas: physical (exercise), mental (learning), social/emotional (relationships), and spiritual (values). Continuous improvement is essential. Take time to maintain and enhance your greatest asset - you."
    }
];

const MOUNTAIN_HEIGHT = 3500;

export default function MountainClimbGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [gameState, setGameState] = useState({
        altitude: 0,
        checkpointsReached: 0,
        health: 3
    });
    const [currentCheckpoint, setCurrentCheckpoint] = useState<number | null>(null);
    const [gameWon, setGameWon] = useState(false);

    interface Block {
        x: number;
        y: number;
        width: number;
        height: number;
        color: string;
    }

    interface Monster {
        x: number;
        y: number;
        width: number;
        height: number;
        alive: boolean;
        health: number;
        maxHealth: number;
    }

    interface Checkpoint {
        x: number;
        y: number;
        width: number;
        height: number;
        reached: boolean;
        habitIndex: number;
    }

    const gameStateRef = useRef({
        player: { x: 400, y: 500, width: 40, height: 40, speed: 3, climbSpeed: 2, attacking: false, health: 3 },
        camera: { y: 0 },
        altitude: 0,
        mountainBlocks: [] as Block[],
        monsters: [] as Monster[],
        checkpoints: [] as Checkpoint[],
        checkpointsReached: 0,
        keys: {} as Record<string, boolean>,
        gamePaused: false,
        animationId: null as number | null
    });

    useEffect(() => {
        if (!gameStarted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        initGame();

        function initGame() {
            generateMountainPath();
            generateMonsters();
            generateCheckpoints();
            gameLoop();
        }

        function generateMountainPath() {
            let currentY = canvas.height - 100;

            while (currentY > -MOUNTAIN_HEIGHT) {
                for (let x = 0; x < canvas.width; x += 40) {
                    const blockHeight = 30 + Math.random() * 20;
                    gameStateRef.current.mountainBlocks.push({
                        x: x,
                        y: currentY,
                        width: 40,
                        height: blockHeight,
                        color: getBlockColor(currentY)
                    });
                }
                currentY -= 35;
            }

            for (let x = 0; x < canvas.width; x += 40) {
                gameStateRef.current.mountainBlocks.push({
                    x: x,
                    y: -MOUNTAIN_HEIGHT,
                    width: 40,
                    height: 50,
                    color: '#FFD700'
                });
            }
        }

        function getBlockColor(y: number) {
            if (y > 200) return '#8B4513';
            if (y > -500) return '#A0522D';
            if (y > -1500) return '#696969';
            return '#D3D3D3';
        }

        function generateMonsters() {
            for (let alt = 300; alt < MOUNTAIN_HEIGHT; alt += 250) {
                const x = 100 + Math.random() * 600;
                gameStateRef.current.monsters.push({
                    x: x,
                    y: canvas.height - 100 - alt,
                    width: 35,
                    height: 35,
                    alive: true,
                    health: 100,
                    maxHealth: 100
                });
            }
        }

        function generateCheckpoints() {
            const checkpointAltitudes = [400, 800, 1200, 1700, 2200, 2700, 3200];

            checkpointAltitudes.forEach((alt, index) => {
                gameStateRef.current.checkpoints.push({
                    x: 400,
                    y: canvas.height - 100 - alt,
                    width: 60,
                    height: 80,
                    reached: false,
                    habitIndex: index
                });
            });
        }

        function gameLoop() {
            if (!gameStateRef.current.gamePaused) {
                update();
                draw(ctx!);
            }
            gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
        }

        function update() {
            const state = gameStateRef.current;
            const player = state.player;

            if (state.keys['ArrowLeft']) player.x -= player.speed;
            if (state.keys['ArrowRight']) player.x += player.speed;
            if (state.keys['ArrowUp']) {
                state.altitude += player.climbSpeed;
                state.camera.y += player.climbSpeed;
            }

            player.x = Math.max(50, Math.min(canvas.width - player.width - 50, player.x));
            player.attacking = state.keys[' '];

            // Check checkpoints
            state.checkpoints.forEach((checkpoint: Checkpoint) => {
                if (!checkpoint.reached) {
                    const screenY = checkpoint.y + state.camera.y;

                    if (Math.abs(player.x - checkpoint.x) < 80 && Math.abs(player.y - screenY) < 80) {
                        checkpoint.reached = true;
                        state.checkpointsReached++;
                        state.gamePaused = true;
                        setCurrentCheckpoint(checkpoint.habitIndex);
                        setGameState(prev => ({ ...prev, checkpointsReached: state.checkpointsReached }));
                    }
                }
            });

            // Check win
            if (state.altitude >= MOUNTAIN_HEIGHT && state.checkpointsReached === 7) {
                setGameWon(true);
                if (state.animationId) cancelAnimationFrame(state.animationId);
            }

            // Monster interaction
            state.monsters.forEach((monster: Monster) => {
                if (monster.alive) {
                    const screenY = monster.y + state.camera.y;

                    if (Math.abs(player.x - monster.x) < 60 && Math.abs(player.y - screenY) < 60) {
                        if (player.attacking) {
                            monster.health -= 2;
                            if (monster.health <= 0) monster.alive = false;
                        } else {
                            player.health--;
                            monster.alive = false;

                            if (player.health <= 0) {
                                alert('Game Over! Try again!');
                                window.location.reload();
                            }
                        }
                    }
                }
            });

            setGameState({
                altitude: Math.floor(state.altitude),
                checkpointsReached: state.checkpointsReached,
                health: player.health
            });
        }

        function draw(ctx: CanvasRenderingContext2D) {
            const state = gameStateRef.current;

            // Sky
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(1, '#E0F6FF');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Mountain blocks
            state.mountainBlocks.forEach((block: Block) => {
                const screenY = block.y + state.camera.y;
                if (screenY > -100 && screenY < canvas.height + 100) {
                    ctx.fillStyle = block.color;
                    ctx.fillRect(block.x, screenY, block.width, block.height);
                    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(block.x, screenY, block.width, block.height);
                }
            });

            // Checkpoints
            state.checkpoints.forEach((checkpoint: Checkpoint) => {
                const screenY = checkpoint.y + state.camera.y;
                if (screenY > -100 && screenY < canvas.height + 100) {
                    if (!checkpoint.reached) {
                        ctx.fillStyle = '#654321';
                        ctx.fillRect(checkpoint.x, screenY - 60, 5, 80);
                        ctx.fillStyle = '#FF4444';
                        ctx.beginPath();
                        ctx.moveTo(checkpoint.x + 5, screenY - 60);
                        ctx.lineTo(checkpoint.x + 45, screenY - 45);
                        ctx.lineTo(checkpoint.x + 5, screenY - 30);
                        ctx.closePath();
                        ctx.fill();
                        ctx.fillStyle = 'white';
                        ctx.font = 'bold 16px Arial';
                        ctx.fillText(String(checkpoint.habitIndex + 1), checkpoint.x + 18, screenY - 40);
                    } else {
                        ctx.font = '40px Arial';
                        ctx.fillText('✅', checkpoint.x, screenY - 20);
                    }
                }
            });

            // Monsters
            state.monsters.forEach((monster: Monster) => {
                if (monster.alive) {
                    const screenY = monster.y + state.camera.y;
                    if (screenY > -50 && screenY < canvas.height + 50) {
                        ctx.fillStyle = '#2ECC40';
                        ctx.fillRect(monster.x, screenY, monster.width, monster.height);
                        ctx.font = '30px Arial';
                        ctx.fillText('👾', monster.x, screenY + 28);
                        ctx.fillStyle = 'red';
                        ctx.fillRect(monster.x, screenY - 8, 35, 4);
                        ctx.fillStyle = 'lime';
                        ctx.fillRect(monster.x, screenY - 8, 35 * (monster.health / monster.maxHealth), 4);
                    }
                }
            });

            // Player
            const player = state.player;
            ctx.font = '40px Arial';
            const avatarEmoji = avatar === 'girl' ? '👧' : avatar === 'dog' ? '🐕' : '🧑';
            ctx.fillText(avatarEmoji, player.x, player.y + 35);

            if (player.attacking) {
                ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
                ctx.beginPath();
                ctx.arc(player.x + 20, player.y + 20, 50, 0, Math.PI * 2);
                ctx.fill();
            }

            // Summit indicator
            if (state.altitude > MOUNTAIN_HEIGHT - 500) {
                ctx.fillStyle = 'gold';
                ctx.font = 'bold 32px Arial';
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 4;
                ctx.strokeText('🏔️ SUMMIT! 🏔️', canvas.width / 2 - 110, 60);
                ctx.fillText('🏔️ SUMMIT! 🏔️', canvas.width / 2 - 110, 60);
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            gameStateRef.current.keys[e.key] = true;
            if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault();
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            gameStateRef.current.keys[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            if (gameStateRef.current.animationId) {
                cancelAnimationFrame(gameStateRef.current.animationId);
            }
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameStarted, avatar]);

    const startGame = (selectedAvatar: string) => {
        setAvatar(selectedAvatar);
        setGameStarted(true);
    };

    const closeCheckpoint = () => {
        setCurrentCheckpoint(null);
        gameStateRef.current.gamePaused = false;
    };

    if (gameWon) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-4">🎉 You reached the summit! 🎉</h2>
                    <h3 className="text-xl text-center mb-6">You have learned all 7 Habits of Highly Effective People!</h3>
                    <div className="space-y-2 mb-6">
                        {SEVEN_HABITS.map((habit) => (
                            <p key={habit.number} className="font-semibold">{habit.number}. {habit.title.replace('Habit ' + habit.number + ': ', '')}</p>
                        ))}
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => window.location.reload()} className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600">
                            Climb Again! 🏔️
                        </button>
                        <Link href="/news" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600">
                            Back to News
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (currentCheckpoint !== null) {
        const habit = SEVEN_HABITS[currentCheckpoint];
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                            {habit.number}
                        </div>
                        <h2 className="text-2xl font-bold text-green-600">{habit.title}</h2>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{habit.description}</p>
                    <button onClick={closeCheckpoint} className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 w-full">
                        Continue Climbing! ⛰️
                    </button>
                </div>
            </div>
        );
    }

    if (!gameStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-4">🏔️ 7 Habits Mountain Climb 🏔️</h1>
                    <p className="text-gray-700 mb-6">Climb the mountain and learn the 7 Habits of Highly Effective People!</p>
                    <p className="font-semibold mb-4">Choose your character:</p>
                    <div className="flex gap-4 justify-center mb-6">
                        <button onClick={() => startGame('man')} className="text-6xl hover:scale-110 transition-transform">🧑</button>
                        <button onClick={() => startGame('girl')} className="text-6xl hover:scale-110 transition-transform">👧</button>
                        <button onClick={() => startGame('dog')} className="text-6xl hover:scale-110 transition-transform">🐕</button>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-left text-sm">
                        <h3 className="font-bold mb-2">📜 How to Play:</h3>
                        <ul className="space-y-1 text-gray-700">
                            <li>• <strong>Left/Right Arrow:</strong> Move across mountain</li>
                            <li>• <strong>Up Arrow:</strong> Climb up steadily</li>
                            <li>• <strong>Hold Space:</strong> Defeat monsters</li>
                            <li>• Reach 7 checkpoint flags to learn each habit</li>
                            <li>• Reach 3500m to complete your journey!</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-lg">
                <div className="flex gap-6 text-lg">
                    <div><strong>Altitude:</strong> {gameState.altitude}m / 3500m</div>
                    <div><strong>Checkpoints:</strong> {gameState.checkpointsReached}/7</div>
                    <div><strong>Health:</strong> {'❤️'.repeat(gameState.health)}</div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                    <strong>Controls:</strong> Left/Right = Move | Up = Climb | Hold Space = Defeat Monsters
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border-4 border-gray-800 rounded-lg shadow-2xl"
            />
            <Link href="/news" className="mt-4 text-white hover:text-blue-300 underline">
                ← Back to News & Forums
            </Link>
        </div>
    );
}