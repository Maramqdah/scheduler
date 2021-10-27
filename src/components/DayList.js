import React from 'react';
import 'components/DayListItem';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  return (
    <ul>{props.days.map((day) =>
      <DayListItem
        selected={props.value === day.name}
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
        key={day.id}  />)}</ul>
  );

}
