import { BaseSchemes, Root, Scope } from 'rete'
import { Area2D } from 'rete-area-plugin'
import { Connection } from 'rete-connection-plugin'

console.log('readonly')

export class ReadonlyPlugin<Schemes extends BaseSchemes> {
    root = new Scope<never, [Root<Schemes>]>('readonly')
    area = new Scope<never, [Area2D<Schemes>, Root<Schemes>]>('readonly')
    connection = new Scope<never, [Connection, Root<Schemes>]>('readonly')

    constructor() {
        this.root.addPipe(context => {
            if (context.type === 'nodecreate') return
            if (context.type === 'connectioncreate') return
            return context
        })
        this.area.addPipe(context => {
            if (context.type === 'nodetranslate') return
            return context
        })
        this.connection.addPipe(context => {
            if (context.type === 'connectionpick') return
            return context
        })
    }
}
