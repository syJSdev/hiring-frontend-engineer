type MissionSummary = {
  id: string;
  name: string;
  total_payload_mass_kg: number;
  color: string;
};

type MissionSummaryByNation = {
  [nation: string]: {
    total_payload_mass_kg: number;
    missions: MissionSummary[];
  };
};
