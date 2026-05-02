import type { MyndraPluginModule } from '@myndra/plugin-sdk'

const plugin: MyndraPluginModule = {
  // Uncomment to filter file events to specific extensions:
  // extensions: () => ['.txt', '.csv'],

  async activate(ctx) {
    ctx.commands.register({
      id: 'your-org.plugin.hello',
      label: 'Hello Plugin',
      run: () => {
        console.log('[PluginTemplate] Hello from your plugin')
      },
    })

    ctx.glyphs.register('plugin-template:hello', ctx.resolveAsset('icon.svg'))
  },
}

export default plugin
