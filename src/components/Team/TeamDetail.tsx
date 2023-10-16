import { FC } from "react";
import { Team } from "../../models/team";
import ButtonComponent from "../ButtonComponent";
import { useUpdateOwned } from "../../hooks/useUpdateOwned";

interface PropsTeamData {
  data: Team;
  userId: string;
  refetch: any;
}

const TeamDetail: FC<PropsTeamData> = ({ data, userId, refetch }) => {
  const updateOwnedMutation = useUpdateOwned({
    onSuccess: () => {
      refetch();
    },
  });

  const handleUpdateOwnedTeams = () => {
    const ownedTeamsUpdate = { ownedTeams: [data._id] };
    updateOwnedMutation.mutate({ userId, body: ownedTeamsUpdate });
  };

  return (
    <div className="card p-3">
      <div className="row">
        <div className="col-md-3">
          <img className="w-100" src={data.shield_image} alt={data.team_name} />
        </div>
        <div className="col-md-9">
          <h3>{data.team_name}</h3>

          <div className="d-flex justify-content-start">
            <div>
              <strong>Año de fundación:</strong> {data.year_foundation}
            </div>
            <div className="ps-2 pe-2"> | </div>
            <div>
              <strong>Ciudad: </strong>
              {data.location_city}
            </div>
          </div>
          <div className="d-flex justify-content-start mt-5">
            <div>
              <ButtonComponent
                width="240px"
                height="40px"
                border="2px solid blue"
                color="red"
                fontSize="18px"
                padding="3px 20px"
                onClick={handleUpdateOwnedTeams}
                background="orange"
              >
                Escoger este equipo
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
