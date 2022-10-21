import type { FC } from 'react';
import cls from 'classnames';
import { numberFormatter } from 'utils/format';

export interface PayloadCardTableProps {
  className?: string;
  dataset: MissionSummary[];
}

const PayloadCardTable: FC<PayloadCardTableProps> = ({ className, dataset }) => {
  return (
    <table className={cls('table-fixed border-collapse text-left w-full', className)}>
      <thead>
        <tr className="uppercase text-charcoal">
          <th scope="col" className="max-w-0 w-2/5 py-2 pr-4">
            <span className="w-full inline-flex items-center justify-start font-bold truncate">
              Mission
            </span>
          </th>
          <th scope="col" className="max-w-0 w-3/5 py-2 px-4">
            <span className="w-full inline-flex items-center justify-start font-bold">
              <span className="truncate">Total Payload Mass</span>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                  />
                </svg>
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {dataset
          .sort((a, b) => b.total_payload_mass_kg - a.total_payload_mass_kg)
          .map((g) => (
            <tr key={g.id}>
              <th scope="row" className="max-w-0 w-2/5 py-2 pr-4 border-b-2 border-ghost-white">
                <span className="w-full inline-flex items-center justify-start font-normal">
                  <span className="h-2 w-2 rounded-full mr-3" style={{ backgroundColor: g.color }} />
                  <span className="flex-1 truncate">{g.name}</span>
                </span>
              </th>
              <td className=" max-w-0 w-3/5 py-2 px-4 border-b-2 border-ghost-white">
                <span className="w-full opacity-60 font-normal truncate">
                  {numberFormatter.format(g.total_payload_mass_kg)} KG
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PayloadCardTable;
