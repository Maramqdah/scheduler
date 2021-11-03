import React from 'react';
import 'components/DayListItem';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  console.log("daylist props", props);
  return (
    <ul>{props.days.map((day) =>
      <DayListItem
        selected={day.name === props.day}
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
        key={day.id} />)}</ul>
  );

}
