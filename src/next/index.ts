import { BaseSchemes, Root, Scope } from 'rete'
import { Area2D } from 'rete-area-plugin'
import { Connection } from 'rete-connection-plugin'

console.log('readonly')

export class ReadonlyPlugin<Schemes extends BaseSchemes> {
    root = new Scope<never, Root<Schemes>>('readonly')
    area = new Scope<never, Area2D<Schemes> | Root<Schemes>>('readonly')
    connection = new Scope<never, Connection | Root<Schemes>>('readonly')

    constructor() {
        this.root.addPipe(data => {
            if (data.type === 'nodecreate') return
            return data
        })
        this.area.addPipe(data => {
            if (data.type === 'nodetranslate') return
            return data
        })
        this.connection.addPipe(data => {
            if (data.type === 'connectionpick') return
            return data
        })
    }
}
