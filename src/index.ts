/// <reference types="rete-connection-plugin" />
import { NodeEditor } from 'rete';

declare module 'rete/types/events' {
    interface EventsTypes {
        isreadonly: void;
        readonly: boolean;
    }
}

type ReteEvents = Array<'keydown' | 'nodetranslate' | 'nodeselect' | 'connectioncreate' | 'connectionremove' | 'nodecreate' | 'noderemove' | 'connectionpick'>

function install(editor: NodeEditor, params: { enabled?: boolean, excludedEvents?: ReteEvents }) {
    editor.bind('isreadonly');
    editor.bind('readonly');

    if (params.enabled !== false) params.enabled = true;

    const excludedEvents = params.excludedEvents || [];

    editor.on('isreadonly', () => params.enabled);
    editor.on('readonly', enabled => {
        params.enabled = enabled;
    });

    let events: ReteEvents = [
        'keydown',
        'connectioncreate',
        'connectionpick',
        'connectionremove',
        'nodecreate',
        'noderemove',
        'nodeselect',
        'nodetranslate'
    ];
    
    events = events.filter(evtName => excludedEvents.indexOf(evtName) < 0);

    editor.on(events, () => editor.silent || params.enabled !== true);
}

export default {
    name: 'readonly',
    install
}