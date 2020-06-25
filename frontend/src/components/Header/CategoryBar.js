import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch } from '@material-ui/core';

export default function Categories(props) {
    const {value} = props;
  const [val, setVal] = useState(value);

  const handleChange = (event, newValue) => {
    switch(newValue){
        case 0:
            window.location.href="/categories/Sports/"+ 0;
            break;
        case 1:
            window.location.href="/categories/Health/" +1;
            break;
        case 2:
            window.location.href="/categories/Toys/" +2;
            break;
        case 3:
              window.location.href="/categories/Fashion/" +3;
              break;

        case 4:
              window.location.href="/categories/Entertainment/" +4;
              break;

    }
  }

  return (
    <Paper square>
      <Tabs
        value={val}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label=" tabs "
        centered
        orientation="horizontal"
      >
        <Tab label="Sports"  />
        <Tab label="Health"  />
        <Tab label="Toys" />
        <Tab label="Fashion"  />
        <Tab label= "Entertainment" />
      </Tabs>
    </Paper>
  );
}