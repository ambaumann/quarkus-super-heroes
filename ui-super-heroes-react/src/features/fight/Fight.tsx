import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faBolt, faRandom } from '@fortawesome/free-solid-svg-icons'
import { faBattleNet } from '@fortawesome/free-brands-svg-icons'
import { Box, Button, Card, CardContent, Collapse, Grid } from '@mui/material';
import { useState } from 'react';
import './Fight.css';
import { Hero, useGetApiFightsRandomfightersQuery, fightsApi, Villain } from '../../app/api/fightsApi';
import { useSelector } from 'react-redux';
import { heroWins, selectHero, selectVillain, selectWinnerName, villainWins } from './fightSlice';
import { FightParticipant } from './FightParticipantCard';
import { store } from '../../app/store';

export function Fight(): JSX.Element {

  const [isShowingHeroPowers, setIsShowingHeroPowers] = useState(false);
  const [isShowingVillainPowers, setIsShowingVillainPowers] = useState(false);
  const { error, isLoading } = useGetApiFightsRandomfightersQuery();
  const [ loadNewFighters] = fightsApi.endpoints.getApiFightsRandomfighters.useLazyQuery()
  const hero: Hero | undefined = useSelector(selectHero);
  const villain: Villain | undefined = useSelector(selectVillain);
  const winnerName = useSelector(selectWinnerName);

  //let winner: string = "";

  function fight() {
    // todo see if there is a good way to handle undefined to null assignment
    if(hero !== undefined && hero.name !== undefined && villain !== undefined && villain.name !== undefined) {
      if(hero.level > villain.level){
        store.dispatch(heroWins());
      } else {
        store.dispatch(villainWins());
      }
    }
  }

  function newFighters() {
    loadNewFighters();
  }

  function fightOptions(): JSX.Element {
    return (
      <Card >
        <CardContent>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Button onClick={newFighters} variant="contained" size="large" startIcon={<FontAwesomeIcon icon={faRandom}/>} style={{minWidth:'200px'}} ><h4>NEW FIGHTERS</h4></Button>
            </Grid>
            <Grid item>
              <Button onClick={fight} variant="contained" size="large" color='secondary' startIcon={<FontAwesomeIcon icon={faBattleNet}/>} style={{minWidth:'200px'}}><h4>FIGHT !</h4></Button>
            </Grid>
          </Grid>
          {winnerName && villain && hero &&
          <div className="winner-text p-6">Winner is <span className={winnerName === villain.name ? 'winner-villain' : 'winner-hero'}>{winnerName}</span></div>
          }
        </CardContent>
      </Card>
    )
  }
   
  return (
      <Grid container spacing={2} className="row" id="fight-row" alignItems="flex-start">
        <Grid item xs={6} sm={4} md={4}>
          { hero && 
            <FightParticipant participant={hero} heroOrVillain='hero' winnerName={winnerName}/>
          }
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          {fightOptions()}
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          { villain && 
            <FightParticipant participant={villain} heroOrVillain='villain' winnerName={winnerName}/>}
        </Grid>
      </Grid>
  );
}
