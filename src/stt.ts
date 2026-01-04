import * as vscode from 'vscode';

export class STTHelper {
    private enabled: boolean;
    private autoSendDelay: number;
    private recognition: any = null;

    constructor(config: vscode.WorkspaceConfiguration) {
        this.enabled = config.get<boolean>('enabled', false);
        this.autoSendDelay = config.get<number>('autoSendDelay', 3000);
    }

    async initialize(): Promise<boolean> {
        // STT would be implemented via Web Speech API in the webview
        // This is a placeholder for the extension structure
        return false;
    }

    stop(): void {
        if (this.recognition) {
            // Stop recognition if active
        }
    }
}

