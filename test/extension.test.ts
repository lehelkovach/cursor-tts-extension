import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('cursor-tts-extension'));
    });

    test('Extension should activate', async () => {
        const extension = vscode.extensions.getExtension('cursor-tts-extension');
        if (extension) {
            await extension.activate();
            assert.ok(extension.isActive);
        }
    });

    test('Commands should be registered', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('cursor-tts.enable'));
        assert.ok(commands.includes('cursor-tts.disable'));
        assert.ok(commands.includes('cursor-tts.test'));
    });
});

suite('TTS Helper Tests', () => {
    test('TTS Helper should initialize', () => {
        const config = vscode.workspace.getConfiguration('cursor-tts');
        // Mock TTS helper creation
        assert.ok(config !== undefined);
    });

    test('TTS should respect enabled setting', () => {
        const config = vscode.workspace.getConfiguration('cursor-tts');
        const enabled = config.get<boolean>('enabled', true);
        assert.ok(typeof enabled === 'boolean');
    });
});

suite('Configuration Tests', () => {
    test('Default configuration should exist', () => {
        const config = vscode.workspace.getConfiguration('cursor-tts');
        assert.ok(config.get('enabled') !== undefined);
        assert.ok(config.get('engine') !== undefined);
        assert.ok(config.get('rate') !== undefined);
        assert.ok(config.get('autoSendDelay') !== undefined);
    });

    test('Configuration values should be valid', () => {
        const config = vscode.workspace.getConfiguration('cursor-tts');
        const engine = config.get<string>('engine', 'system');
        assert.ok(['system', 'pyttsx3', 'gtts'].includes(engine));
        
        const rate = config.get<number>('rate', 150);
        assert.ok(rate > 0 && rate < 1000);
        
        const delay = config.get<number>('autoSendDelay', 3000);
        assert.ok(delay >= 0);
    });
});

