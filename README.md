# Myndra Plugin Template

A minimal template repository for building third-party Myndra plugins.

## Requirements

- Node.js 20+
- npm 10+

## Project Structure

```
plugin-template/
├── src/
│   └── index.ts          # Plugin entry point
├── assets/
│   └── icon.svg          # Example glyph asset (PNG recommended for production)
├── myndra-plugin.json     # Plugin manifest
├── build.mjs              # Build script (esbuild)
├── package.json
├── tsconfig.json
└── dist/                  # Build output (gitignored)
    └── index.js
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Update the manifest fields in `myndra-plugin.json`:

- `name`: unique plugin id (`^[a-z][a-z0-9._-]*$`)
- `displayName`: human-readable name for the UI
- `description`: short summary
- `author`: your name or org
- `permissions`: declare only what you need

3. Build:

```bash
npm run build
```

4. Watch mode (rebuild on save):

```bash
npm run watch
```

5. Install into Myndra:

Copy the plugin folder to `~/.config/myndra/plugins/your-org.plugin.your-plugin/`, then restart Myndra. You will be prompted to trust the plugin on first load.

## Minimal Permissions

The template requests:

- `commands:register`
- `glyphs:register`

Add permissions in `myndra-plugin.json` as you adopt more SDK APIs.

## Template Behavior

The example plugin:

- Registers a command called "Hello Plugin".
- Registers a glyph at `plugin-template:hello` using `assets/icon.svg`.

## Next Steps

If you need more than a command + glyph:

- File previews and parsing: use `ctx.filePreview` and `ctx.treeSitter`.
- Session graph layers: use `createSessionGraphCollector` and `ctx.graph.session.inject`.
- Hierarchy mutations: use `ctx.hierarchy.registerAdapter`.

See the [Plugin Authoring Guide](https://github.com/myndraapp/Myndra/tree/main/docs/plugin-authoring) and the reference adapters under `test-fixtures/plugins/`.
