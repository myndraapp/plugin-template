import type { MyndraPluginModule } from '@myndra/plugin-sdk'

const plugin: MyndraPluginModule = {
  async activate(ctx) {
    // ── Glyphs ──────────────────────────────────────────────────
    // Register glyph URLs for each custom kind the plugin creates.
    // Nodes must set `image` to this URL in their attributes —
    // the network view does NOT auto-resolve glyphs from the registry.
    const iconUrl = ctx.resolveAsset('assets/icon.svg')
    ctx.glyphs.register('my-plugin:item', iconUrl)

    // ── Commands ────────────────────────────────────────────────
    ctx.commands.register({
      id: 'my-plugin:hello',
      label: 'Hello Plugin',
      category: 'My Plugin',
      run: () => {
        console.log('[MyPlugin] Hello from your plugin')
      },
    })

    // ── Scope handling ──────────────────────────────────────────
    // The network view emits `graph:plugin-scope` to request data.
    // Plugins that inject session nodes MUST handle this event,
    // otherwise nodes will never appear in the network view.
    //
    // The `graph:loaded` event fires BEFORE third-party plugins
    // are trusted, so it cannot be used for initial data loading.
    // Use `graph:plugin-scope` with scope='full' instead.
    ctx.events.on('graph:plugin-scope', async ({ pluginId, scope }) => {
      if (pluginId !== ctx.manifest.name) return
      if (scope === 'full') {
        // Scan / compute data and inject session nodes here.
        // Use createSessionGraphCollector() from '@myndra/plugin-sdk/helpers'
        // to build the payload, then call:
        //   ctx.graph.session.inject({ nodes: payload.nodes, edges: payload.edges })
      } else {
        ctx.graph.session.clear()
      }
    })

    // ── File events (optional) ──────────────────────────────────
    // ctx.events.on('file:changed', async ({ nodeKey, path }) => { ... })
    // ctx.events.on('filesystem:after-sync', async () => { ... })
  },

  deactivate() {
    // Clean up any state, timers, or subscriptions here.
  },
}

export default plugin
