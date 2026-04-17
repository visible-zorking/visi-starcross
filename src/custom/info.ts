
/* Return the initial sourceloc to display. */
export function sourceloc_start() : string
{
    return 'K:251:1:265:0';  // 'verbs.zil', lines 251-264
}

// Presentation order. Filenames must match game-info!
export const sourcefile_presentation_list: string[] = [
    'sf.zil',
    'dungeon.zil',
    'emerg.zil',
    'actions.zil',
    'main.zil',
    'parser.zil',
    'syntax.zil',
    'verbs.zil',
    'macros.zil',
    'clock.zil',
    'crufty.zil',
];
