import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,

  },
  input: {
    display: 'none',
  },
});

// /**
//  * The example data is structured as follows:
//  *
//  * import image from 'path/to/image.jpg';
//  * [etc...]
//  *
//  * const tileData = [
//  *   {
//  *     img: image,
//  *     title: 'Image',
//  *     author: 'author',
//  *   },
//  *   {
// //  *     [etc...]
//  *   },
//  * ];
//  */
// function UserLandingPage(props) {
//   const { classes } = props;

<<<<<<< HEAD
class UserLandingPage extends Component {
  render() {
    return (
      <Grid container>
        <Grid item sm>
          
          <Paper style={{ padding: 20, margin: 20, textAlign: 'center' }}>
            <Button variant="outlined" color="inherit">
              Messages
              </Button>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={{ padding: 20, margin: 20, textAlign: 'center'  }}>
            <Button variant="outlined" color="inherit" component={Link} to="/workoutform" >
              Workouts
              </Button>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={{ padding: 20, margin: 20, textAlign: 'center'  }}>
            <Button variant="outlined" color="inherit">
              Macro Track
              </Button>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default UserLandingPage;
=======
//   return (
//     <div className={classes.root}>
//       <GridList cellHeight={180} className={classes.gridList}>
//         <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
//           <ListSubheader component="div">December</ListSubheader>
//         </GridListTile>
//         {tileData.map(tile => (
//           <GridListTile key={tile.img}>
//             <img src={tile.img} alt={tile.title} />
//             <GridListTileBar
//               title={tile.title}
//               subtitle={<span>by: {tile.author}</span>}
//               actionIcon={
//                 <IconButton className={classes.icon}>
//                   <InfoIcon />
//                 </IconButton>
//               }
//             />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }

// UserLandingPage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(UserLandingPage);
>>>>>>> development
