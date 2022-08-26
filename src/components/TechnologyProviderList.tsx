import { FC } from 'react';
import CustomCard from './CustomCard';
import TechnologyProviderCard from './TechnologyProviderCard';
import { TechnologyProvider } from './TechnologyProviderModal';

interface TechnologyProviderListProps {
  providers: [TechnologyProvider];
}

const TechnologyProviderList: FC<TechnologyProviderListProps> = (
  props: TechnologyProviderListProps
) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 m-4">
      {props.providers.map((provider) => {
        return (
          <TechnologyProviderCard
            description={provider.description}
            image={provider.image}
            title={provider.title}
            key={provider.title}
            onClick={provider.onClick}></TechnologyProviderCard>
        );
      })}
      <CustomCard />
    </div>
  );
};

export default TechnologyProviderList;
