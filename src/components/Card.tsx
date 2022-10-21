import type { FC } from 'react';
import cls from 'classnames';

export interface CardProps {
  className?: string;
  title?: string;
  titleActions?: React.ReactNode;
  children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ className, title, titleActions, children }) => {
  const isHeadExists = !!(title && titleActions);

  return (
    <div className={cls('shadow-lg shadow-munsell', className)}>
      {isHeadExists && (
        <div className="bg-white rounded-t-lg px-6 py-3 mb-1 flex justify-between items-center">
          {!!title && <h2 className="text-xl font-bold">{title}</h2>}
          {!!titleActions && <div className="flex justify-end items-center">{titleActions}</div>}
        </div>
      )}
      <div className={cls('bg-white p-6', isHeadExists ? 'rounded-b-lg' : 'rounded-lg')}>{children}</div>
    </div>
  );
};

export default Card;
