import * as vscode from 'vscode';
import { TTSHelper } from './tts';
import { STTHelper } from './stt';

let ttsHelper: TTSHelper | null = null;
let sttHelper: STTHelper | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Cursor TTS/STT extension is now active!');

    // Initialize TTS helper
    const config = vscode.workspace.getConfiguration('cursor-tts');
    const enabled = config.get<boolean>('enabled', true);
    
    if (enabled) {
        ttsHelper = new TTSHelper(config);
    }

    // Register commands
    const enableCommand = vscode.commands.registerCommand('cursor-tts.enable', () => {
        vscode.workspace.getConfiguration().update('cursor-tts.enabled', true, vscode.ConfigurationTarget.Global);
        ttsHelper = new TTSHelper(vscode.workspace.getConfiguration('cursor-tts'));
        vscode.window.showInformationMessage('TTS enabled');
    });

    const disableCommand = vscode.commands.registerCommand('cursor-tts.disable', () => {
        vscode.workspace.getConfiguration().update('cursor-tts.enabled', false, vscode.ConfigurationTarget.Global);
        if (ttsHelper) {
            ttsHelper.stop();
            ttsHelper = null;
        }
        vscode.window.showInformationMessage('TTS disabled');
    });

    const testCommand = vscode.commands.registerCommand('cursor-tts.test', () => {
        if (ttsHelper) {
            ttsHelper.speak('TTS test successful. The extension is working correctly.');
        } else {
            vscode.window.showWarningMessage('TTS is not enabled. Enable it in settings first.');
        }
    });

    context.subscriptions.push(enableCommand, disableCommand, testCommand);

    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('cursor-tts')) {
                const newConfig = vscode.workspace.getConfiguration('cursor-tts');
                const newEnabled = newConfig.get<boolean>('enabled', true);
                
                if (newEnabled && !ttsHelper) {
                    ttsHelper = new TTSHelper(newConfig);
                } else if (!newEnabled && ttsHelper) {
                    ttsHelper.stop();
                    ttsHelper = null;
                } else if (ttsHelper) {
                    ttsHelper.updateConfig(newConfig);
                }
            }
        })
    );
}

export function deactivate() {
    if (ttsHelper) {
        ttsHelper.stop();
    }
    if (sttHelper) {
        sttHelper.stop();
    }
}

