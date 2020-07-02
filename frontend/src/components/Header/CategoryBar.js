import React,{useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch } from '@material-ui/core';
import axios from 'axios';

export default function Categories(props) {
  const [categories, setCategories]= useState([]);
    const {value} = props;
  const [val, setVal] = useState(value);
 useEffect(()=>{
   axios.get("https://limitless-lowlands-36879.herokuapp.com/categories")
   .then((result)=>{
     console.log(result);
      setCategories(result.data.categories)
   })
 },[])


  const handleChange = (event, newValue) => {
    console.log(event.target.innerHTML);
    window.location.href = "/categories/"+ event.target.innerHTML +"/"+ newValue;
  }

  return (
    <>
   
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
         {categories.map(cat=>(
        <Tab key= {cat._id} label={cat.category} />
        ))}
        {/* <Tab label="Health"  />
        <Tab label="Toys" />
        <Tab label="Fashion"  />
        <Tab label= "Entertainment" /> */}
      </Tabs>
    </Paper>
    
    </>
  );
}