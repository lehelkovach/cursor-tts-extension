# Cursor TTS/STT Extension

A Cursor IDE extension that integrates Text-to-Speech (TTS) and Speech-to-Text (STT) functionality for enhanced accessibility and hands-free interaction.

## Features

- **TTS Announcements**: Automatically announces when tasks complete, steps finish, or input is needed
- **STT Voice Input**: Voice input in chat with auto-send after silence
- **Chime Notifications**: Audio chime when input/approval is needed
- **Queued Speech**: Thread-safe speech queue for concurrent requests
- **Configurable**: Customize speech rate, volume, auto-send delay, and more

## Installation

### Prerequisites

- Cursor IDE (based on VS Code)
- Node.js 18+ and npm
- System TTS (for Linux: `spd-say`, `espeak`, or `festival`)

### Install System TTS (Linux)

```bash
# Option 1: Speech Dispatcher (recommended)
sudo apt-get install speech-dispatcher

# Option 2: espeak
sudo apt-get install espeak

# Option 3: Festival
sudo apt-get install festival
```

### Install Extension

#### Method 1: From Source (Development)

1. Clone the repository:
```bash
git clone https://github.com/lehelkovach/cursor-tts-extension.git
cd cursor-tts-extension
```

2. Install dependencies:
```bash
npm install
```

3. Compile TypeScript:
```bash
npm run compile
```

4. Open in Cursor:
   - Press `F5` to open a new Extension Development Host window
   - Or use Command Palette: `Developer: Install Extension from Location...`
   - Select the `cursor-tts-extension` folder

#### Method 2: Install VSIX Package

1. Build the extension:
```bash
npm install -g vsce
npm run compile
vsce package
```

2. Install in Cursor:
   - Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Run: `Extensions: Install from VSIX...`
   - Select the generated `.vsix` file

#### Method 3: Manual Installation

1. Copy the extension folder to Cursor's extensions directory:
   - **Linux**: `~/.config/Cursor/User/extensions/`
   - **macOS**: `~/Library/Application Support/Cursor/User/extensions/`
   - **Windows**: `%APPDATA%\Cursor\User\extensions\`

2. Restart Cursor

## Configuration

Open Cursor Settings (`Ctrl+,` / `Cmd+,`) and search for "Cursor TTS":

- **cursor-tts.enabled**: Enable/disable TTS (default: `true`)
- **cursor-tts.engine**: TTS engine - `system`, `pyttsx3`, or `gtts` (default: `system`)
- **cursor-tts.rate**: Speech rate in words per minute (default: `150`)
- **cursor-tts.autoSendDelay**: Auto-send delay for STT in milliseconds (default: `3000`)

Or edit `settings.json` directly:

```json
{
  "cursor-tts.enabled": true,
  "cursor-tts.engine": "system",
  "cursor-tts.rate": 150,
  "cursor-tts.autoSendDelay": 3000
}
```

## Usage

### TTS Announcements

TTS announcements happen automatically when:
- Tasks complete
- Steps finish execution
- Input/approval is needed (with chime)

### STT Voice Input

1. Click the microphone button in the chat interface
2. Allow microphone access when prompted
3. Speak your message
4. After 3 seconds of silence, it will auto-send
5. Or click Send manually anytime

### Commands

- `Cursor TTS: Enable` - Enable TTS announcements
- `Cursor TTS: Disable` - Disable TTS announcements
- `Cursor TTS: Test` - Test TTS with a sample message

## Development

### Project Structure

```
cursor-tts-extension/
├── src/              # TypeScript source code
│   └── extension.ts  # Main extension entry point
├── out/              # Compiled JavaScript
├── test/             # Test files
├── package.json      # Extension manifest
└── README.md         # This file
```

### Building

```bash
# Compile TypeScript
npm run compile

# Watch mode (auto-compile on changes)
npm run watch
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Debugging

1. Open the project in Cursor
2. Press `F5` to launch Extension Development Host
3. Set breakpoints in `src/extension.ts`
4. Use the debug console to inspect variables

## Requirements

- Cursor IDE 1.80.0 or higher
- Node.js 18+ for development
- System TTS installed (see Prerequisites)

## Troubleshooting

### TTS Not Working

1. **Check TTS is enabled**: Verify `cursor-tts.enabled` is `true` in settings
2. **Test system TTS**: Run `spd-say "test"` in terminal
3. **Check logs**: Open Cursor Output panel (`View > Output`) and select "Cursor TTS"
4. **Verify audio**: Ensure system audio is working

### STT Not Working

1. **Check microphone permission**: Allow microphone access in browser/system settings
2. **Test microphone**: Use system voice recorder to verify mic works
3. **Browser compatibility**: Web Speech API works best in Chrome/Edge
4. **Check console**: Open browser DevTools (F12) to see errors

### Extension Not Loading

1. **Check Cursor version**: Requires Cursor 1.80.0+
2. **Reload window**: `Ctrl+Shift+P` > `Developer: Reload Window`
3. **Check output**: View extension logs in Output panel
4. **Reinstall**: Uninstall and reinstall the extension

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT

## Support

- **Issues**: https://github.com/lehelkovach/cursor-tts-extension/issues
- **Documentation**: See `docs/` folder for detailed documentation

## Acknowledgments

Built for Cursor IDE to enhance accessibility and productivity through voice interaction.
