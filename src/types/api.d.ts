type Mission = {
  id: string;
  name: string;
  payloads?: (MissionPayload | null)[];
};

type MissionPayload = {
  id: string;
  payload_mass_kg: number | null;
  nationality?: string;
};
