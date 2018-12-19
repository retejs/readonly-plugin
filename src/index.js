function install(editor, params = { enabled: true }) {
    editor.bind('isreadonly');
    editor.bind('readonly');

    editor.on('isreadonly', () => params.enabled);
    editor.trigger('readonly', enabled => params.enabled = enabled);

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

export default {
    install
}