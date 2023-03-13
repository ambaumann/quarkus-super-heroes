import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { Hero, useGetApiFightsRandomfightersQuery, fightsApi, Villain } from '../../app/api/fightsApi';
import { heroWins, selectHero, selectVillain, selectWinnerName, villainWins } from './fightSlice';
import { FightParticipant } from './FightParticipantCard';
import { store } from '../../app/store';
import { FightControls } from './FightControls';

import './Fight.css';



export function Fight(): JSX.Element {

  // TODO its not apparent that this get call is the initial load. Can use a lazy approach and the trigger with useEffect maybe. Maybe we need to do error handling? Maybe we watch loading state?
  const { error, isLoading } = useGetApiFightsRandomfightersQuery();
  const [ loadNewFighters] = fightsApi.endpoints.getApiFightsRandomfighters.useLazyQuery()
  // const [ updateFight, {isLoading: isUpdating}] = usePostApiFightsMutation()
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

  return (
      <Grid container spacing={2} className="row" id="fight-row" alignItems="flex-start">
        <Grid item xs={6} sm={4} md={4}>
          <FightParticipant participant={hero} heroOrVillain='hero' winnerName={winnerName}/>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <FightControls heroName={hero?.name} villainName={villain?.name} winnerName={winnerName} fightCallback={fight} newFightCallback={newFighters}/>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <FightParticipant participant={villain} heroOrVillain='villain' winnerName={winnerName}/>
        </Grid>
      </Grid>
  );
}
