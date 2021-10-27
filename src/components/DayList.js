import React from 'react';
import 'components/DayListItem';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  return (
    <ul>{props.days.map((day) => <DayListItem selected={props.day === day.name}
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
      full={day.spots === 0} />)}</ul>
  );

}