import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faBolt, faRandom } from '@fortawesome/free-solid-svg-icons'
import { faBattleNet } from '@fortawesome/free-brands-svg-icons'
import { Box, Button, Card, CardContent, Collapse, Grid } from '@mui/material';
import { useState } from 'react';
import './Fight.css';
import { Hero, useGetApiFightsRandomfightersQuery, fightsApi, Villain } from '../../app/api/fightsApi';
import { useSelector } from 'react-redux';
import { selectHero, selectVillain } from './fightSlice';

export function Fight(): JSX.Element {

  const [winner, setWinner] = useState("");
  const [isShowingHeroPowers, setIsShowingHeroPowers] = useState(false);
  const [isShowingVillainPowers, setIsShowingVillainPowers] = useState(false);
  const { error, isLoading } = useGetApiFightsRandomfightersQuery();
  const [ trigger, { data } ] = fightsApi.endpoints.getApiFightsRandomfighters.useLazyQuery()
  const hero: Hero | undefined = useSelector(selectHero);
  const villain: Villain | undefined = useSelector(selectVillain);

  //let winner: string = "";

  function fight() {
    // todo see if there is a good way to handle undefined to null assignment
    if(hero !== undefined && hero.name !== undefined && villain !== undefined && villain.name !== undefined) {
      let winnersName = hero.level > villain.level ? hero.name : villain.name;
      setWinner(winnersName);
    }
  }

  function newFighters() {
    trigger();
    setWinner("");
  }

  function toggleIsShowingHeroPowers(): void {
    setIsShowingHeroPowers(!isShowingHeroPowers);
  };

  function toggleIsShowingVillainPowers(): void {
    setIsShowingVillainPowers(!isShowingVillainPowers);
  };

  function heroJSX(): JSX.Element {
    return (
      <Box className={`hero ${hero?.name === winner ? 'hero-winner-card' : 'off'}`}>
        <h2 className="hero-name">
          { hero ? hero.name : 'No Hero' }
        </h2>
        { hero && 
        <>
          {/*adding a random query name property to the image to prevent caching of the same url. There might be a better way to do this. */}
          <img key={hero.name} className="my-rounded pt-3" src={hero.picture +"?help=" + hero.name} alt="Hero" />
          <h2>
            <FontAwesomeIcon icon={faBolt}/>{hero.level?.toString()}
          </h2>
          <h2 className='p-5'><FontAwesomeIcon role="button" onClick={toggleIsShowingHeroPowers} icon={faAtom} className="powers hero" /></h2>

          <Collapse className='pb-5' in={isShowingHeroPowers} >
              {hero.powers}
          </Collapse>
        </>
        }
      </Box>
    )
  }

  function villainJSX(): JSX.Element {
    return (
      <Box className={`villain ${villain?.name === winner? 'villain-winner-card' : 'off'}`}>
        <h2 className="villain-name">
          { villain ? villain.name : 'No Hero' }
        </h2>
        { villain && 
        <>
          {/*adding a random query name property to the image to prevent caching of the same url. There might be a better way to do this. */}
          <img key={villain.name}  className="my-rounded pt-3" src={villain.picture +"?help=" + villain.name} alt="Villain" />
          <h2>
            <FontAwesomeIcon icon={faBolt}/>{villain.level?.toString()}
          </h2>
          <h2 className='p-5'><FontAwesomeIcon role="button" onClick={toggleIsShowingVillainPowers} icon={faAtom} className="powers villain" /></h2>

          <Collapse in={isShowingVillainPowers} >
              {villain.powers}
          </Collapse>
        </>
        }
      </Box>
    )
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
          {winner && villain && hero &&
          <div className="winner-text p-6">Winner is <span className={winner === villain.name ? 'winner-villain' : 'winner-hero'}>{winner}</span></div>
          }
        </CardContent>
      </Card>
    )
  }
   
  return (
      <Grid container spacing={2} className="row" id="fight-row" alignItems="flex-start">
        <Grid item xs={6} sm={4} md={4}>
          {heroJSX()}
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          {fightOptions()}
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          {villainJSX()}
        </Grid>
      </Grid>
  );
}
