export function install(editor, params) {
    
    const events = [
        'keydown',
        'nodetranslate',
        'nodeselect',
        'connectioncreate',
        'connectionremove',
        'nodecreate',
        'noderemove'
    ];

    editor.on(events.join(' '), () => editor.silent || params.enabled !== true);
}