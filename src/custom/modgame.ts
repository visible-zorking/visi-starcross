import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState, ZStatePlus } from '../visi/zstate';
import { OptPosition, ExtraToggle } from '../visi/map';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map, gamedat_object_ids, gamedat_roominfo_names } from '../visi/gamedat';

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

const center = { x: 370.41666, y: 259.29169 };

export function map_scrollcenter(zstate: ZStatePlus, locname: string): OptPosition
{
    let rot = map_rotations[locname || ''];
    if (rot) {
        let theta = -Math.PI * (rot / 180.0);
        let roomobj = gamedat_roominfo_names.get(locname);
        if (roomobj) {
            let pos = roomobj.center;
            let vec = { x: pos.x - center.x, y: pos.y - center.y };
            let res = {
                x: vec.x * Math.cos(theta) + vec.y * Math.sin(theta),
                y: vec.y * Math.cos(theta) - vec.x * Math.sin(theta),
            };
            //###console.log('### ', theta, vec, res);
            return { x: res.x + center.x, y: res.y + center.y };
        }
    }
    
    return null;
}

export function map_adjustments(zstate: ZStatePlus): ExtraToggle[]
{
    let here = zstate.globals[0]; // HERE
    let locname = gamedat_object_ids.get(here)?.name;
    
    let ls: ExtraToggle[] = [];

    let rot = map_rotations[locname || ''];
    let mtransform = '';
    if (rot) {
        mtransform = 'translate('+center.x+','+center.y+'), rotate('+rot+'), translate(-'+center.x+',-'+center.y+')';
    }
    
    ls.push({ id: 'turntable', transform: mtransform });
    
    return ls;
}
