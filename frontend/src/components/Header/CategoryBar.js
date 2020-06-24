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
            window.location.href="/search/Sports";
            break;
        case 1:
            window.location.href="/search/Health";
            break;
        case 2:
            window.location.href="/search/Fashion";
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
      >
        <Tab label="Sports" />
        <Tab label="Health" />
        <Tab label="Fashion" />
      </Tabs>
    </Paper>
  );
}