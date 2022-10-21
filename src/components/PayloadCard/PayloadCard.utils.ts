import { useMemo } from 'react';
import { tolRainbowColor } from 'utils/color';

/**
 * Get the number of colors
 *
 * @param count count
 * @returns array of color
 */
export function getColors(count: number) {
  const colors: string[] = [];
  for (let index = 1; index <= count; index++) {
    const color = tolRainbowColor(index / count);
    colors.push(color);
  }
  return colors;
}

/**
 * Hook to use mission summary data by nation
 *
 * @param missions missions
 * @returns group mission summry by nation
 */
export function useMissionSummary(missions: Mission[]): MissionSummaryByNation {
  const summary: MissionSummaryByNation = useMemo(() => {
    const summaryPerNation = missions.reduce<MissionSummaryByNation>(
      (sum, mission) => {
        if (!mission.payloads) return sum;

        const summaryPerMission = mission.payloads.reduce<{
          [nation: string]: number;
        }>((spm, payload) => {
          if (!payload) return spm;
          const nationality = payload.nationality ?? 'Unknown';

          return {
            [nationality]: (spm[nationality] ?? 0) + (payload.payload_mass_kg ?? 0),
            __total: (spm.__total ?? 0) + (payload.payload_mass_kg ?? 0),
          };
        }, {});

        const totalPayloadPerMission = summaryPerMission.__total;
        delete summaryPerMission['__total'];

        Object.entries(summaryPerMission).forEach(([nationality, totalPayloadPerMissionAndNation]) => {
          if (!sum[nationality]) {
            sum[nationality] = {
              total_payload_mass_kg: 0,
              missions: [],
            };
          }

          const item: MissionSummary = {
            id: mission.id,
            name: mission.name,
            total_payload_mass_kg: totalPayloadPerMissionAndNation,
            color: '',
          };

          sum[nationality].missions.push(item);
          sum[nationality].total_payload_mass_kg += totalPayloadPerMission;
        });

        const allNationSummary: MissionSummary = {
          id: mission.id,
          name: mission.name,
          total_payload_mass_kg: totalPayloadPerMission,
          color: '',
        };
        sum[''].total_payload_mass_kg += totalPayloadPerMission;
        sum[''].missions.push(allNationSummary);

        return sum;
      },
      {
        '': {
          total_payload_mass_kg: 0,
          missions: [],
        },
      }
    );

    Object.entries(summaryPerNation).forEach(([nation, item]) => {
      const count = item.missions.length;
      const colors = getColors(count);
      colors.forEach((color, index) => {
        item.missions[index].color = '#' + color;
      });
    });

    return summaryPerNation;
  }, [missions]);

  return summary;
}
