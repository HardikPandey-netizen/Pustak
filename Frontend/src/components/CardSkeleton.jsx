import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkeleton({ cards }) {
  return (
    <div className="flex flex-row flex-wrap gap-2 ml-4 mt-4">
      {Array(cards).fill(0).map((items, i) => (
        <div className="border w-48 h-80 flex flex-col items-center" key={i}>
          <div className="pt-3 w-40 h-56">
            <Skeleton height={'100%'} width={'100%'} />
          </div>
          <div className="flex flex-col items-start mt-4 mr-2 w-40">
            <p className="mb-1">
              <Skeleton height={10} width={'60%'} />
            </p>
            <p className="mb-1">
              <Skeleton height={14} width={'90%'} />
            </p>
            <div className="flex flex-row gap-6 mt-1">
              <Skeleton height={14} width={40} />
              <Skeleton height={14} width={40} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
