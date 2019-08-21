import { NodeEditor, } from 'rete';

declare module 'rete/types/events' {
    interface EventsTypes {
        isreadonly: void;
        readonly: boolean;
    }
}

function install(editor: NodeEditor, params: { enabled?: boolean }) {
    editor.bind('isreadonly');
    editor.bind('readonly');

    if (params.enabled !== false) params.enabled = true;

    editor.on('isreadonly', () => params.enabled);
    editor.on('readonly', enabled => {
        params.enabled = enabled;
    });

    const events = [
        'keydown',
        'nodetranslate',
        'nodeselect',
        'connectioncreate',
        'connectionremove',
        'nodecreate',
        'noderemove'
    ];

    editor.on(events.join(' ') as any, () => editor.silent || params.enabled !== true);
}

export default {
    name: 'readonly',
    install
}