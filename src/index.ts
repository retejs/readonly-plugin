import { BaseSchemes, Root, Scope } from 'rete'
import { Area2D } from 'rete-area-plugin'
import { Connection } from 'rete-connection-plugin'

/**
 * Readonly plugin, disables all user interactions
 * @priority 9
 * @listens nodecreate
 * @listens connectioncreate
 * @listens nodetranslate
 * @listens connectionpick
 * @example const readonly = new ReadonlyPlugin<Schemes>();
editor.use(readonly.root);
editor.use(area);
area.use(readonly.area);
area.use(render);
connection.use(readonly.connection);
area.use(connection);
 */
export class ReadonlyPlugin<Schemes extends BaseSchemes> {
  root = new Scope<never, [Root<Schemes>]>('readonly')
  area = new Scope<never, [Area2D<Schemes>, Root<Schemes>]>('readonly')
  connection = new Scope<never, [Connection, Root<Schemes>]>('readonly')

  /**
   * Readonly mode state
   */
  enabled = false

  constructor() {
    this.root.addPipe(context => {
      if (!this.enabled) return context
      if (context.type === 'nodecreate') return
      if (context.type === 'connectioncreate') return
      return context
    })
    this.area.addPipe(context => {
      if (!this.enabled) return context
      if (context.type === 'nodetranslate') return
      return context
    })
    this.connection.addPipe(context => {
      if (!this.enabled) return context
      if (context.type === 'connectionpick') return
      return context
    })
  }

  /**
   * Enable the readonly mode
   */
  public enable() {
    this.enabled = true
  }

  /**
   * Disable the readonly mode
   */
  public disable() {
    this.enabled = false
  }
}
