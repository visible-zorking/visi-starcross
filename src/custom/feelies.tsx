import React from 'react';

import { ExtWebLink } from './about';

export function FeeliesPage()
{
    return (
        <div className="ScrollContent">
            <div className="FeeliesPage">
                <h2>Commands for space captains</h2>
                <p>
                    You may wish to use shipboard directions while on
                    a spaceship or space station:{' '}
                    <code>FORE</code>, <code>AFT</code>, <code>STARBOARD</code>, <code>PORT</code>.
                    (Or <code>F</code>, <code>AFT</code>, <code>SB</code>, <code>P</code> for short.)
                    However, the usual <code>NORTH</code>, <code>SOUTH</code>, <code>EAST</code>, <code>WEST</code>
                    {' '}will work as well. <code>FORE</code> is always <code>NORTH</code>.
                </p>
                <p>
                    (There are no diagonal directions in this game.
                    &#x201C;Aftport&#x201D; and &#x201C;foresb&#x201D;
                    would be weird.)
                </p>
                <p>
                    To direct your spacecraft, instruct your ship&#x2019;s
                    computer:
                </p>
                <p>
                    <code>COMPUTER, SET COURSE FOR <i>location</i></code><br/>
                    <code>COMPUTER, CONFIRM</code>
                </p>
                <p>
                    If the destination is not programmed into your
                    computer, you&#x2019;ll have to determine the coordinates
                    (<code>RANGE</code>, <code>THETA</code>, <code>PHI</code>)
                    and then set them manually:
                </p>
                <p>
                    <code>COMPUTER, RANGE IS <i>value</i></code><br/>
                    <code>COMPUTER, THETA IS <i>value</i></code><br/>
                    <code>COMPUTER, PHI IS <i>value</i></code><br/>
                    <code>COMPUTER, CONFIRM</code><br/>
                </p>
                <p>
                    (Don&#x2019;t include the degree signs for{' '}
                    <code>THETA</code> and <code>PHI</code>.)
                </p>
                <h2>The mass detector chart</h2>
                <p>
                    So where you get these coordinates?{' '}
                    <i>Starcross</i> originally came with a chart
                    representing the <code>MASS DETECTOR OUTPUT</code>
                    {' '}that you find on the Bridge. The chart showed
                    the coordinates of every nearby object, printed
                    in silver, black, orange, and purple. (Beautiful
                    {' '}<em>and</em> hard to photocopy!)
                    I have redrawn the chart for this exhibit:
                </p>
                <FeelieLink url={ 'chart.jpeg' } width={ 500 } height={ 333 } text={ 'The mass detector chart' } />
                <p>
                    For a photo of the original 1982 chart,{' '}
                    <a target="_blank" href="pic/chart-scan.jpeg">see here</a>.
                    (Image courtesy of the{' '}
                    <a target="_blank" href="https://www.mocagh.org/loadpage.php?getgame=starcrossfolio">Museum of Computer Adventure Game History</a>.)
                </p>
                <p>
                    If you don&#x2019;t feel like puzzling out polar
                    coordinates, here is the same information in tabular form:
                </p>
                <ChartTable />
            </div>
        </div>
    );
}

type MassEntry = [string, number, number, number];

const uncharted_masses: MassEntry[] = [
    ["UM08", 150, 210,  17],
    ["UM12", 100, 345, 107],
    ["UM24", 100, 285,  87],
    ["UM28", 250,  45, 178],
    ["UM31", 150, 105,  67],
    ["UM52", 175, 165,  35],
    ["UM70", 100, 135, 101],
    ["UM91", 50,  15,  121],
];

const charted_masses: MassEntry[] = [
    ["AX01", 200, 240, 134],
    ["AX32", 125, 240, 105],
    ["AX71", 125, 180,  47],
    ["AX87", 125,  75, 102],
];

const Mars: MassEntry = ["Mars", 250, 120,  12];
const AB40: MassEntry = ["AB40", 250, 300,  22];
const US75: MassEntry = ["US75", 175, 135,  34];

function ChartTable()
{
    let rowls = [];

    rowls.push(
        <tr key="divplanet">
            <td colSpan={ 4 } className="LabelRow" >Inhabited planets</td>
        </tr>
    );
    rowls.push(
        <ChartRow key="Mars" row={ Mars } />
    );
    rowls.push(
        <ChartRow key="AB40" row={ AB40 } extra="Ceres" />
    );
    rowls.push(
        <tr key="divast">
            <td colSpan={ 4 } className="LabelRow" >Charted asteroids</td>
        </tr>
    );
    for (let row of charted_masses) {
        rowls.push(
            <ChartRow key={ row[0] } row={ row } />
        );
    }
    rowls.push(
        <tr key="divship">
            <td colSpan={ 4 } className="LabelRow" >Spaceships</td>
        </tr>
    );
    rowls.push(
        <ChartRow key="US75" row={ US75 } />
    );
    rowls.push(
        <tr key="divum">
            <td colSpan={ 4 } className="LabelRow" >Uncharted masses</td>
        </tr>
    );
    for (let row of uncharted_masses) {
        rowls.push(
            <ChartRow key={ row[0] } row={ row } />
        );
    }
    
    return (
        <table className="ChartTable">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Range</th>
                    <th>Theta</th>
                    <th>Phi</th>
                </tr>
                { rowls }
            </tbody>
        </table>
    );
}

function ChartRow({ row, extra }: { row:MassEntry, extra?:string })
{
    return (
        <tr>
            <td>
                { row[0] }
                { extra && <><br/><span className="ChartExtra">({ extra })</span></>}
            </td>
            <td>{ row[1] }</td>
            <td>{ row[2] }&#xB0;</td>
            <td>{ row[3] }&#xB0;</td>
        </tr>
    );
}

function FeelieLink({ url, text, width, height } : { url:string, text:string, width:number, height:number })
{
    return (
        <p className="Feelie">
            <a href={ './pic/'+url } target="_blank">
                <img src={ './pic/thumb/'+url } width={ width } height={ height } />
            </a>
            <br/>
            <a href={ './pic/'+url } target="_blank">{ text }</a>
        </p>
    )
}
