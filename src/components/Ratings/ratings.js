import React, {
    Component
} from 'react'
import * as service from './service'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = theme => ({
     root: {
    width: '50%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',    
  },
  table: {
    minWidth: 400,
  },
  center:{
      align:'center'
  }  ,
  progress: {
    margin: theme.spacing(2),
  },
})


export class Ratings extends Component {
    constructor(props) {
        super(props)
     this.state= {
         selectedAuthorityId:-1,
         ratings:{},
         isloading:false
         }
    }
    async componentDidMount() {
        if(this.props.authorityId>-1)
       await this.getRatings(this.props.authorityId);        
    }

    async getRatings(authorityId){
        this.setState({ 
        isloading:true
         })

        const a=await service.getRatings(authorityId);
        this.setState({ ratings: a,
        selectedAuthorityId:authorityId,
        isloading:false
         })
    }

async componentDidUpdate(prevProps) {
     if (prevProps.authorityId !== this.props.authorityId) {
       console.log(this.props.authorityId);       
       await this.getRatings(this.props.authorityId);
     }
   }

    render() {
         const {
      classes      
    } = this.props
        return (
           <div>                      
<div className={classes.center}>
{ this.state.isloading && <CircularProgress className={classes.progress} />    }

{!this.state.isloading && Object.keys(this.state.ratings).length>0 &&
<Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rating</TableCell>
            <TableCell>Percentage</TableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {
           Object.keys(this.state.ratings).map(ratingId=>    
            <TableRow key={ratingId}>
              <TableCell component="th" scope="row">
                {ratingId}
              </TableCell>
              <TableCell align="right">{this.state.ratings[ratingId]}</TableCell>       
            </TableRow>
           )
          }
        </TableBody>
      </Table>
    </Paper>
}

</div>
           </div>      
        )
    }

}

export default withStyles(styles)(Ratings)