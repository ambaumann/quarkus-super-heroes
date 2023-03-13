import { Hero, Villain } from '../../app/api/fightsApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faBolt } from '@fortawesome/free-solid-svg-icons'
import { Box, Collapse} from '@mui/material';
import { useState } from 'react';
import './FightParticipantCard.css';




export function FightParticipant(props: {participant: Hero | Villain | undefined, heroOrVillain: 'hero'|'villain', winnerName: string|undefined}): JSX.Element {

  // can not type check participant because Hero and Villain interfaces have the same parameters
  const classNamePrefix = (props.heroOrVillain === 'hero')? 'hero': 'villain';
  const participant = props.participant;
  const winnerName = props.winnerName;

  const [isShowingPowers, setIsShowingPowers] = useState(false);
  // todo pass in css for blue or red?
  function toggleIsShowingPowers(): void {
    setIsShowingPowers(!isShowingPowers);
  };

  // TODO participant loading and smoother animation. New fight kinda looks jumpy....


  return (
    <Box className={`${classNamePrefix + ' ' + (participant?.name === winnerName ? classNamePrefix+'-winner-card' : 'off')}`}>
      <h2 className={classNamePrefix+'-name'}>
        { participant ? participant.name : 'No Hero' }
      </h2>
      { participant && 
      <>
        {/*adding a random query name property to the image to prevent caching of the same url. There might be a better way to do this. */}
        <img key={participant.name} className="my-rounded pt-3" src={participant.picture +"?help=" + participant.name} alt="Fight Participant" />
        <h2>
          <FontAwesomeIcon icon={faBolt}/>{participant.level?.toString()}
        </h2>
        <h2 className='p-5'><FontAwesomeIcon role="button" onClick={toggleIsShowingPowers} icon={faAtom} className={`powers ${classNamePrefix}`} /></h2>

        <Collapse className='pb-10' in={isShowingPowers} >
            {participant.powers}
        </Collapse>
      </>
      }
    </Box>
  )
}