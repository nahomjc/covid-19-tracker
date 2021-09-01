import React from 'react'
import{Card,CardContent,Typography} from "@material-ui/core"


function InfoBox({title,cases,total}) {
  return (
    <div>
      <Card>

        <CardContent>
           {/*Title i */}
           <Typography className="infoBox__title"color="textSecondary">
             {title}
           </Typography>
           <h2 className="infoBox__cases">{cases}</h2>


           <Typography className="infoBox__total" color="textSecondary">
             {total}Total
           </Typography>
           {/*120k number of case*/}
            {/*1.2M total */}


        </CardContent>
      </Card>
      
    </div>
  )
}

export default InfoBox
