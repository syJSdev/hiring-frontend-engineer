import { useMemo, useState, FC } from 'react';
import Card from 'components/Card';
import PayloadCardChart from 'components/PayloadCardChart';
import PayloadCardTable from 'components/PayloadCardTable';
import Dropdown from 'components/Dropdown';
import type { DropDownItem } from 'components/Dropdown';
import { useMissionSummary } from './PayloadCard.utils';

export interface PayloadCardProps {
  className?: string;
  missions: Mission[];
}

const PayloadCard: FC<PayloadCardProps> = ({ className, missions }) => {
  const [selectedNation, setSelectedNation] = useState('');
  const summaryByNation = useMissionSummary(missions);
  const nationItems = useMemo(() => {
    return Object.entries(summaryByNation).map(([nation, value]) => {
      const item: DropDownItem<string> = {
        label: nation === '' ? 'All Nations' : nation,
        value: nation,
      };
      return item;
    });
  }, [summaryByNation]);

  return (
    <Card
      className={className}
      title="Total Payload Per Mission"
      titleActions={
        <>
          <Dropdown
            className="inline-block relative w-40"
            items={nationItems}
            value={selectedNation}
            onChange={setSelectedNation}
            placeholder="Select Nation"
          />
        </>
      }
    >
      <div className="flex flex-col md:flex-row md:h-60">
        <PayloadCardChart className="h-full" dataset={summaryByNation[selectedNation]?.missions ?? []} />
        <PayloadCardTable
          className="h-60 md:h-full"
          dataset={summaryByNation[selectedNation]?.missions ?? []}
        />
      </div>
    </Card>
  );
};

export default PayloadCard;
