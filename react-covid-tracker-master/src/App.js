import React,{useState,useEffect} from 'react'
import{ MenuItem, FormControl, Select,Card,CardContent}from "@material-ui/core"
import './App.css'
import InfoBox from './InfoBox';

import Table from"./Table"
import {sortData} from"./util";
import LineGraph from './LineGraph';

function App() {
  const [countries,setCountries]= useState([""]); 
  const[country,setCountry]=useState("worldwide");
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([])
  

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>setCountryInfo(data));
    
  }, [])
   
  useEffect(() => {
    const getCountriesData=async()=>{ await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=>response.json())
    .then((data)=>{

      const countries=data.map((country)=>(
       { name: country.country, 
        value: country.countryInfo.iso2
    }
      ));
      const sortedData=sortData(data);
      setCountries(countries) ;
      setTableData(sortedData);
    });
    
    };
    
      getCountriesData(); 
    
  }, []);

 const onCountryChange=async(event)=>{
   const countryCode=event.target.value;
   console.log("yoo",countryCode)
   setCountry(countryCode);

   const url=countryCode==='worldwide'?
   "https://disease.sh/v3/covid-19/all"
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{setCountryInfo(data);
    
    });

 };
 console.log("Country info",countryInfo)
  return (
    <div className="app"> 
    <div className="app__left"> 
    <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
      <Select variant="outlined" value={country} onChange={onCountryChange}>
         <MenuItem value="worldwide">WorldWide</MenuItem>
         {countries.map(country=>(<MenuItem value={country.value}>{country.name}</MenuItem>))
         }


      </Select> 
      </FormControl>
      </div>
     
     <div className="app__stats">


    <InfoBox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
    
    <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
    
    <InfoBox title="Deaths"total={countryInfo.deaths} cases={countryInfo.deaths}/>
         {/*infoBox */}
         {/*infobox*/}

     </div>
      
      
     
         {/*map */}
       

    </div>
     <Card className="app__right">
       <CardContent>
        <h3>Live case by country</h3>

        <Table countries={tableData}/>
        <h3>WorldWide new cases</h3> 
        <LineGraph/>
         {/*Table */}
         {/*Graph */}
       </CardContent>
        

     </Card>
    </div>
  )
}

export default App
