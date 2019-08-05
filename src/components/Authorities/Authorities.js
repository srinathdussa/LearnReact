import React, {
    Component
} from 'react'
import * as service from './service'
import Ratings from '../Ratings/ratings'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = theme => ({
    root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  progress: {
    margin: theme.spacing(2),
  },
})

export class Authorities extends Component {
    constructor(props) {
        super(props)
     this.state= {
         authorites:[] ,
         selectedLocalAuthorityId:-1  ,
         isloading:true
         }
         this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        console.log('calling');
        const a=await service.getAuthorities();
        this.setState({ authorites: a , isloading:false})
    }

    handleChange(e) {
        console.log(e);
        
        
        const localAuthId=e.target.value;        
    this.setState({selectedLocalAuthorityId: localAuthId})
  }

    render() {
        const {
      classes      
    } = this.props
        return (
            <div>        
            { this.state.isloading && <CircularProgress className={classes.progress} />    }
            {
                !this.state.isloading &&
            <FormControl className={classes.formControl}>
        <InputLabel htmlFor="auth">Authority</InputLabel>
        <Select
          value={this.state.selectedLocalAuthorityId}
          onChange={this.handleChange}          
        >
         {
                        this.state.authorites.map((item,index)=>                       
                        <MenuItem key={index} value={item.LocalAuthorityId}>{item.Name}</MenuItem>
                    )
                }
          
        </Select>
      </FormControl>   
            } 
            <Ratings authorityId={this.state.selectedLocalAuthorityId}></Ratings>     
            </div>
        )
    }

}
export default withStyles(styles)(Authorities)