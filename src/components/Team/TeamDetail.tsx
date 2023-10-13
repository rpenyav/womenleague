import React, { FC } from "react";
import { Team } from "../../models/team";

interface PropsTeamData {
  data: Team;
}

const TeamDetail: FC<PropsTeamData> = ({ data }) => {
  return <div>TeamDetail {data.formal_name}</div>;
};

export default TeamDetail;
