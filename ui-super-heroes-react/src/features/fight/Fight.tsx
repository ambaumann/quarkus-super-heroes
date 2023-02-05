import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faBolt, faRandom } from '@fortawesome/free-solid-svg-icons'
import { faBattleNet } from '@fortawesome/free-brands-svg-icons'
import { Box, Button, Card, CardContent, Collapse, Grid } from '@mui/material';
import { useState } from 'react';
import './Fight.css';

export function Fight(): JSX.Element {

  const [winner, setWinner] = useState("");
  const [isShowingHeroPowers, setIsShowingHeroPowers] = useState(false);
  const [isShowingVillainPowers, setIsShowingVillainPowers] = useState(false);

  interface Hero {
    name?: string,
    picture?: string,
    powers?: string,
    level?: bigint
  }

  interface Villain {
    name?: string,
    picture?: string,
    powers?: string,
    level?: bigint
  }

  interface Fighters {
    hero?: Hero,
    villain?: Villain,
  }

  const fighterConst: Fighters = {
    hero: {
      name: "Hero Bob",
      picture: "https://raw.githubusercontent.com/quarkusio/quarkus-super-heroes/characterdata/images/manga-fukidashi-956027853811960086.jpg",
      powers: "Shield Shield",
      level: BigInt(490)
    },
    villain: {
      name: "Villain Kreg",
      picture: "https://raw.githubusercontent.com/quarkusio/quarkus-super-heroes/characterdata/images/kal-el-1807017096061602247.jpg",
      powers: "boom boom",
      level: BigInt(501)
    }
  }

  // todo make sure this is a copy
  let fighters: Fighters = {
    ...fighterConst
  };

  //let winner: string = "";

  function fight() {
    // todo see if there is a good way to handle undefined to null assignment
    if(fighters.hero !== undefined && fighters.hero.name !== undefined) {
      setWinner(fighters.hero.name);
    }
  }

  function newFighters() {
    fighters = {
      ...fighterConst
    }
    setWinner("");
  }

  function toggleIsShowingHeroPowers(): void {
    setIsShowingHeroPowers(!isShowingHeroPowers);
  };

  function toggleIsShowingVillainPowers(): void {
    setIsShowingVillainPowers(!isShowingVillainPowers);
  };

  function hero(): JSX.Element {
    return (
      <Box className={`hero ${fighters.hero?.name === winner ? 'hero-winner-card' : 'off'}`}>
        <h2 className="hero-name">
          { fighters.hero ? fighters.hero.name : 'No Hero' }
        </h2>
        { fighters.hero && 
        <>
          <img className="my-rounded pt-3" src={fighters.hero.picture} alt="Hero" />
          <h2>
            <FontAwesomeIcon icon={faBolt}/>{fighters.hero!.level?.toString()}
          </h2>
          <h2 className='p-5'><FontAwesomeIcon role="button" onClick={toggleIsShowingHeroPowers} icon={faAtom} className="powers hero" /></h2>

          <Collapse className='pb-5' in={isShowingHeroPowers} >
              {fighters.hero.powers}
          </Collapse>
        </>
        }
      </Box>
    )
  }

  function villain(): JSX.Element {
    return (
      <Box className={`villain ${fighters.villain?.name === winner? 'villain-winner-card' : 'off'}`}>
        <h2 className="villain-name">
          { fighters.villain ? fighters.villain.name : 'No Hero' }
        </h2>
        { fighters.villain && 
        <>
          <img className="my-rounded pt-3" src={fighters.villain.picture} alt="Villain" />
          <h2>
            <FontAwesomeIcon icon={faBolt}/>{fighters.villain!.level?.toString()}
          </h2>
          <h2 className='p-5'><FontAwesomeIcon role="button" onClick={toggleIsShowingVillainPowers} icon={faAtom} className="powers villain" /></h2>

          <Collapse in={isShowingVillainPowers} >
              {fighters.villain.powers}
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
          {winner && fighters.villain && fighters.hero &&
          <div className="winner-text p-6">Winner is <span className={winner === fighters.villain.name ? 'winner-villain' : 'winner-hero'}>{winner}</span></div>
          }
        </CardContent>
      </Card>
    )
  }
   
  return (
      <Grid container spacing={2} className="row" id="fight-row" alignItems="flex-start">
        <Grid item xs={6} sm={4} md={4}>
          {hero()}
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          {fightOptions()}
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          {villain()}
        </Grid>
      </Grid>
  );
}
