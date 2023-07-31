import React from "react";
import useSWR from "swr";
import Eventitem from "./Eventitem";
import { getEvents } from "./EventHelper";
import { fetcher } from './SWRHelper';

export default function Eventlist() {
  const { data } = useSWR("http://localhost:3333/events", fetcher);

  if (!data) {
    return (
      <div className="container mt-5">Now Loading...</div>
    );
  }

  return (
    <div className="container" id="eventtable">
      <div className="container">
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Artist</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(event => (
                <Eventitem event={event} key={event.id} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}