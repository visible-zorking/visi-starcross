import { unpack_address } from '../visi/gametypes';
import { GnustoEngine, ZState, ZStatePlus } from '../visi/zstate';
import { OptPosition, ExtraToggle } from '../visi/map';
import { gamedat_routine_names, gamedat_global_names, gamedat_string_map } from '../visi/gamedat';

export function show_commentary_hook(topic: string, engine: GnustoEngine): string|null
{
    return null;
}

export function map_adjustments(zstate: ZStatePlus): ExtraToggle[]
{
    let ls: ExtraToggle[] = [];

    const centerx = 370.41666;
    const centery = 259.29169;

    let mtransform = 'translate('+centerx+','+centery+'), rotate('+(45)+'), translate(-'+centerx+',-'+centery+')';
    ls.push({ id: 'turntable', transform: mtransform });
    
    return ls;
}
