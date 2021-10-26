import React from 'react';
import 'components/DayListItem';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const days = props.days.map((day)=><DayListItem name={day.name} spots={day.spots} setDay={props.setDay}/>);

  return(
    <ul>{days}</ul>
  );
  
}