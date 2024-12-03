# mcp-server-commands

An MCP server to run commands.

> [!WARNING]
> Be careful what you ask this server to run!
> In Claude Desktop app, use `Approve Once` (not `Allow for This Chat`) so you can review each command, use `Deny` if you don't trust the command.
> Permissions are dictated by the user that runs the server.
> DO NOT run with `sudo`.

## Tools

Tools are for LLMs to request, i.e. Claude Desktop app

- `run_command` - run a command, i.e. `hostname` or `ls -al` or `echo "hello world"` etc
  - Returns STDOUT and STDERR as text
- `run_script` - run a script! (i.e. `fish`, `bash`, `zsh`, `python`)
  - Let your LLM run the code it writes!
  - script is passed over STDIN

## Prompts

Prompts are for users to include in chat history, i.e. via `Zed`'s slash commands (in its AI Chat panel)

- `run_command` - generate a prompt message with the command output

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

### Use the published npm package

```json
{
  "mcpServers": {
    "mcp-server-commands": {
      "command": "npx",
      "args": ["mcp-server-commands"]
    }
  }
}
```

### Use a local build (repo checkout)

```json
{
  "mcpServers": {
    "mcp-server-commands": {
      // works b/c of shebang in index.js
      "command": "/path/to/mcp-server-commands/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
