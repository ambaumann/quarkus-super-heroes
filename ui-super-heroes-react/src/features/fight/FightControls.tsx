import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import { faBattleNet } from '@fortawesome/free-brands-svg-icons'
import { Button, Card, CardContent, Grid } from '@mui/material';
import './FightControls.css';

export interface FightControlsProps {
  heroName: string | undefined,
  villainName: string | undefined,
  winnerName: string| undefined,
  fightCallback: ()=> void,
  newFightCallback: ()=> void
}

export function FightControls(props: FightControlsProps): JSX.Element {
  return (
      <Card >
        <CardContent>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Button onClick={props.newFightCallback} variant="contained" size="large" startIcon={<FontAwesomeIcon icon={faRandom}/>} style={{minWidth:'200px'}} ><h4>NEW FIGHTERS</h4></Button>
            </Grid>
            <Grid item>
              <Button onClick={props.fightCallback} variant="contained" size="large" color='secondary' startIcon={<FontAwesomeIcon icon={faBattleNet}/>} style={{minWidth:'200px'}}><h4>FIGHT !</h4></Button>
            </Grid>
          </Grid>
          {props.winnerName && props.villainName && props.heroName &&
          <div className="winner-text p-6">Winner is <span className={props.winnerName === props.villainName ? 'winner-villain' : 'winner-hero'}>{props.winnerName}</span></div>
          }
        </CardContent>
      </Card>
  );
}