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
      <PayloadCardChart dataset={summaryByNation[selectedNation]?.missions ?? []} />
      <PayloadCardTable dataset={summaryByNation[selectedNation]?.missions ?? []} />
    </Card>
  );
};

export default PayloadCard;
