import { unpack_address, ObjectData } from '../visi/gametypes';
import { GnustoEngine, ZState, ZStatePlus } from '../visi/zstate';
import { OptPosition, ExtraToggle } from '../visi/map';
import { gamedat_ids, gamedat_routine_names, gamedat_global_names, gamedat_string_map, gamedat_object_ids, gamedat_roominfo_names } from '../visi/gamedat';

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

const map_docking_ring: { [key: string]: boolean } = {
    'GREEN-LOCK': true,
    'GREEN-DOCK': true,
    'UMBILICAL': true,
    'CARGO-ROOM': true,
    'GUARD-ROOM': true,
    'THRONE-ROOM': true,
    'YELLOW-LOCK': true,
    'YELLOW-DOCK': true,
    'YELLOW-DOCK-EDGE': true,
    'BLUE-LOCK': true,
    'BLUE-DOCK': true,
    'BUBBLE-ROOM': true,
    'SPHERE-SHIP': true,
}

const map_rotations: { [key: string]: number } = {
    'GREEN-LOCK': 90,
    'GREEN-DOCK': 90,
    'UMBILICAL': 90,
    'CARGO-ROOM': 90,
    'GUARD-ROOM': 90,
    'THRONE-ROOM': 90,
    'YELLOW-LOCK': 180,
    'YELLOW-DOCK': 180,
    'YELLOW-DOCK-EDGE': 180,
    'BLUE-LOCK': 270,
    'BLUE-DOCK': 270,
    'BUBBLE-ROOM': 270,
    'SPHERE-SHIP': 270,
    
    'VILLAGE-NW-EDGE': 22.5,
    'VILLAGE': 45,
    'VILLAGE-SW-EDGE': 45,
    'MAZE': 67.5,
    'GREEN-ONE': 90,
    'GREEN-TWO': 90,
    'GREEN-THREE': 90,
    'GREEN-FOUR': 90,
    'GREEN-FIVE': 90,
    'VILLAGE-N-EDGE': 90,
    'VILLAGE-S-EDGE': 90,
    'GREEN-YELLOW-ONE': 135,
    'COMPUTER-ROOM': 135,
    'VILLAGE-SE-EDGE': 135,
    'VILLAGE-NE-EDGE': 135,
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
    'ZOO': 315,
    'GARAGE': 315,
    'NEST-CAGE': 337.5,
    'GRUE-CAGE': 292.5,
    'IN-GRUE-CAGE': 292.5,
};

const center = { x: 952.49997/2, y: 952.49994/2 };
const labelcenter = { x:677.3333, y: 597.95819 };

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

    if (rot) {
        mtransform = 'translate('+labelcenter.x+','+labelcenter.y+'), rotate('+(360-rot)+')';
    }
    else {
        mtransform = 'translate('+labelcenter.x+','+labelcenter.y+')';
    }
    ls.push({ id: 'label-center', transform: mtransform });

    let zobj = zstate.objects[gamedat_ids.MOUSE-1];
    if (zobj) {
        let mobcen: OptPosition = null;
        let mobloc: ObjectData|undefined;
        if (zobj.parent) {
            mobloc = gamedat_object_ids.get(zobj.parent);
            if (mobloc) {
                let throomobj = gamedat_roominfo_names.get(mobloc.name);
                if (throomobj) {
                    mobcen = throomobj.bottom;
                }
            }
        }
        if (mobcen && mobloc) {
            let posx = mobcen.x;
            let posy = mobcen.y;
            let mtransform = 'translate('+posx+','+posy+')';
            ls.push({ id: 'mob-mouse', class:'', transform: mtransform });
        }
        else {
            ls.push({ id: 'mob-mouse', class:'Offstage' });
        }
    }
    
    return ls;
}
