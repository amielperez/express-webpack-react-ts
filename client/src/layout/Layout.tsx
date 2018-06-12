import * as React from 'react';
import SimpleBarChart from '../visualizers/SimpleBarChart';
import MeekBarChart from '../visualizers/MeekBarChart';

var data = [5, 10, 15, 20, 25];
const Layout = (props: any) => (
    <div>
        <SimpleBarChart data={data}
        orientation="horizontal"
        color="slateblue"/>
        <MeekBarChart data={data} width={500} height={300}></MeekBarChart>
    </div>
);

export default Layout;
