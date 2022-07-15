export interface DashboardHeaderProps {
  header: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  header,
}: DashboardHeaderProps) => {
  return (
    <header className="flex py-11">
      <h1 className="font-bold text-2xl ">{header}</h1>
    </header>
  );
};

export default DashboardHeader;
