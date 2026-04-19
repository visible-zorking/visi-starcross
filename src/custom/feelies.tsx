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

type MassRow = [string, number, number, number];

const uncharted_masses = [
	["UM08", 150, 210,  17],
	["UM12", 100, 345, 107],
	["UM24", 100, 285,  87],
	["UM28", 250,  45, 178],
	["UM31", 150, 105,  67],
	["UM52", 175, 165,  35],
	["UM70", 100, 135, 101],
	["UM91", 50,  15,  121],
];

function ChartTable()
{
    let rowls = [];
    for (let row of uncharted_masses) {
        rowls.push(
            <tr key={ row[0] }>
                <td>{ row[0] }</td>
                <td>{ row[1] }</td>
                <td>{ row[2] }&#xB0;</td>
                <td>{ row[3] }&#xB0;</td>
            </tr>
        )
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
                <tr>
                    <td colSpan={ 4 } className="LabelRow" >Charted destinations</td>
                </tr>
                <tr>
                    <td colSpan={ 4 } className="LabelRow" >Uncharted masses</td>
                </tr>
                { rowls }
            </tbody>
        </table>
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
