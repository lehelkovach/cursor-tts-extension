import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class TTSHelper {
    private enabled: boolean;
    private engine: string;
    private rate: number;
    private volume: number;
    private queue: string[] = [];
    private isSpeaking: boolean = false;

    constructor(config: vscode.WorkspaceConfiguration) {
        this.enabled = config.get<boolean>('enabled', true);
        this.engine = config.get<string>('engine', 'system');
        this.rate = config.get<number>('rate', 150);
        this.volume = config.get<number>('volume', 0.8);
    }

    updateConfig(config: vscode.WorkspaceConfiguration) {
        this.enabled = config.get<boolean>('enabled', true);
        this.engine = config.get<string>('engine', 'system');
        this.rate = config.get<number>('rate', 150);
        this.volume = config.get<number>('volume', 0.8);
    }

    async speak(text: string): Promise<void> {
        if (!this.enabled || !text) {
            return;
        }

        this.queue.push(text);
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.isSpeaking || this.queue.length === 0) {
            return;
        }

        this.isSpeaking = true;
        const text = this.queue.shift()!;

        try {
            await this.speakText(text);
        } catch (error) {
            console.error('TTS error:', error);
        } finally {
            this.isSpeaking = false;
            // Process next item in queue
            if (this.queue.length > 0) {
                this.processQueue();
            }
        }
    }

    private async speakText(text: string): Promise<void> {
        if (this.engine === 'system') {
            await this.speakSystem(text);
        } else {
            // For other engines, would need additional dependencies
            console.warn(`TTS engine ${this.engine} not yet implemented`);
        }
    }

    private async speakSystem(text: string): Promise<void> {
        const platform = process.platform;
        let command: string;

        if (platform === 'linux') {
            // Try spd-say first, then espeak
            try {
                await execAsync('which spd-say');
                command = `spd-say "${text}"`;
            } catch {
                try {
                    await execAsync('which espeak');
                    const rateArg = Math.floor(this.rate * 0.6);
                    command = `espeak -s ${rateArg} "${text}"`;
                } catch {
                    throw new Error('No TTS engine found. Install spd-say or espeak.');
                }
            }
        } else if (platform === 'darwin') {
            const rateArg = Math.floor(this.rate / 10);
            command = `say -r ${rateArg} "${text}"`;
        } else if (platform === 'win32') {
            // PowerShell command for Windows
            const escapedText = text.replace(/'/g, "''");
            command = `powershell -Command "Add-Type -AssemblyName System.Speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Rate = ${this.rate - 150}; $speak.Speak('${escapedText}')"`;
        } else {
            throw new Error(`Unsupported platform: ${platform}`);
        }

        await execAsync(command);
    }

    stop(): void {
        this.queue = [];
        this.isSpeaking = false;
    }
}

