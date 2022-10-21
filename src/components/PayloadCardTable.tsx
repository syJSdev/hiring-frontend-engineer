import { AriaAttributes, FC, MouseEventHandler, useMemo, useState } from 'react';
import cls from 'classnames';
import { numberFormatter } from 'utils/format';
import { assertUnreachable } from 'utils/type';

export interface PayloadCardTableProps {
  className?: string;
  dataset: MissionSummary[];
}

interface PayloadCardTableSortBy {
  column?: keyof MissionSummary;
  order?: AriaAttributes['aria-sort'];
}

const PayloadCardTable: FC<PayloadCardTableProps> = ({ className, dataset }) => {
  const [sortBy, setSortBy] = useState<PayloadCardTableSortBy>({
    column: 'total_payload_mass_kg',
    order: 'descending',
  });
  const { column: sortByColumn, order: sortByOrder } = sortBy;

  const sortedData = useMemo(() => {
    if (!sortByColumn || !sortByOrder) return dataset;

    return [...dataset].sort((a, b) => {
      switch (sortByColumn) {
        case 'id':
        case 'color':
        case 'name': {
          const valueA = a[sortByColumn] ?? '';
          const valueB = b[sortByColumn] ?? '';
          if (sortByOrder === 'ascending') return valueA.localeCompare(valueB);
          if (sortByOrder === 'descending') return valueB.localeCompare(valueA);
          break;
        }

        case 'total_payload_mass_kg': {
          const valueA = a[sortByColumn] ?? 0;
          const valueB = b[sortByColumn] ?? 0;
          if (sortByOrder === 'ascending') return valueA - valueB;
          if (sortByOrder === 'descending') return valueB - valueA;
          break;
        }

        default:
          return assertUnreachable(sortByColumn, `Sort is not supported on this column: ${sortByColumn}`);
      }

      console.warn('Unhandled sort', { sortByOrder });
      return 0;
    });
  }, [sortByColumn, sortByOrder, dataset]);

  const onClickTableHeader =
    (column: PayloadCardTableSortBy['column']): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      setSortBy((prev) => {
        let order: PayloadCardTableSortBy['order'];
        if (prev.column === column) {
          if (prev.order === 'descending') order = 'none';
          else if (prev.order === 'ascending') order = 'descending';
          else order = 'ascending';
        } else {
          order = 'ascending';
        }

        return {
          column,
          order,
        };
      });
    };

  const renderSortIcon = (column: PayloadCardTableSortBy['column']) => {
    const sortIconVisibleStates: PayloadCardTableSortBy['order'][] = ['ascending', 'descending'];

    return (
      <span
        className={cls(sortBy.order === 'ascending' && 'rotate-180')}
        hidden={column !== sortBy.column || !sortIconVisibleStates.includes(sortBy.order ?? 'none')}
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  return (
    <div className={cls('overflow-auto', className)}>
      <table className={'table-fixed border-collapse text-left w-full'}>
        <thead>
          <tr className="uppercase text-charcoal">
            <th scope="col" className="max-w-0 w-2/5 py-2 pr-4 sticky top-0 bg-white z-[1]">
              <button
                onClick={onClickTableHeader('name')}
                className="w-full inline-flex items-center justify-start font-bold"
                aria-sort={sortBy.column === 'name' ? sortBy.order : undefined}
              >
                <span className="truncate">Mission</span>
                {renderSortIcon('name')}
              </button>
            </th>
            <th scope="col" className="max-w-0 w-3/5 py-2 px-4 sticky top-0 bg-white z-[1]">
              <button
                onClick={onClickTableHeader('total_payload_mass_kg')}
                className="w-full inline-flex items-center justify-start font-bold"
                aria-sort={sortBy.column === 'total_payload_mass_kg' ? sortBy.order : undefined}
              >
                <span className="truncate">Total Payload Mass</span>
                {renderSortIcon('total_payload_mass_kg')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((g) => (
            <tr key={g.id}>
              <th scope="row" className="max-w-0 w-2/5 py-2 pr-4 border-b-2 border-ghost-white bg-white">
                <span className="w-full inline-flex items-center justify-start font-normal">
                  <span className="h-2 w-2 rounded-full mr-3" style={{ backgroundColor: g.color }} />
                  <span className="flex-1 truncate">{g.name}</span>
                </span>
              </th>
              <td className=" max-w-0 w-3/5 py-2 px-4 border-b-2 border-ghost-white bg-white">
                <span className="w-full opacity-60 font-normal truncate">
                  {numberFormatter.format(g.total_payload_mass_kg)} KG
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayloadCardTable;
