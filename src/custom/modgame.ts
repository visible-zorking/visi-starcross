import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState, ZStatePlus } from '../visi/zstate';
import { OptPosition, ExtraToggle } from '../visi/map';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map, gamedat_object_ids } from '../visi/gamedat';

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

const map_rotations: { [key: string]: number } = {
    'GREEN-ONE': 90,
    'GREEN-TWO': 90,
    'GREEN-THREE': 90,
    'GREEN-FOUR': 90,
    'GREEN-FIVE': 90,
    'GREEN-YELLOW-ONE': 135,
    'COMPUTER-ROOM': 135,
    'YELLOW-ONE': 180,
    'YELLOW-TWO': 180,
    'YELLOW-THREE': 180,
    'YELLOW-FOUR': 180,
    'YELLOW-FOUR-FIVE': 180,
    'YELLOW-FIVE': 180,
    'OBSERVATORY': 225,
    'WEAPONS-DECK': 225,
    'FF-ROOM': 225,
    'BLUE-ONE': 270,
    'BLUE-ONE-TWO': 270,
    'BLUE-TWO': 270,
    'BLUE-THREE': 270,
    'BLUE-34': 270,
    'BLUE-FOUR': 270,
    'BLUE-FIVE': 270,
    'BLUE-RED-TWO': 315,
    'BLUE-RED-FOUR': 315,
    'GARAGE': 315,
};

export function map_adjustments(zstate: ZStatePlus): ExtraToggle[]
{
    let here = zstate.globals[0]; // HERE
    let locname = gamedat_object_ids.get(here)?.name;
    
    let ls: ExtraToggle[] = [];

    const centerx = 370.41666;
    const centery = 259.29169;

    let rot = map_rotations[locname || ''];
    let mtransform = '';
    if (rot) {
	mtransform = 'translate('+centerx+','+centery+'), rotate('+rot+'), translate(-'+centerx+',-'+centery+')';
    }
    
    ls.push({ id: 'turntable', transform: mtransform });
    
    return ls;
}
