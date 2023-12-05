import { useState, KeyboardEvent, memo, MouseEvent } from 'react';
import { SortingOption } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSortType } from '../../store/app-process/app-process';
import { getSortType } from '../../store/app-process/selectors';

function SortOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const sortType = useAppSelector(getSortType);

  const iconStyle = {
    transform: `translateY(-50%) ${isOpened ? 'rotate(180deg)' : ''}`,
  };

  const handleSortTypeClick = (selectedSortType: string | null) => {
    dispatch(setSortType(selectedSortType));
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setIsOpened(false);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={handleKeydown} >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={(evt: MouseEvent<HTMLSpanElement>) => {
        evt.preventDefault();
        setIsOpened(!isOpened);
      }}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4" style={iconStyle} >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}
        onClick={(evt: MouseEvent<HTMLUListElement>) => {
          evt.preventDefault();
          handleSortTypeClick((evt.target as HTMLElement).textContent);
          setIsOpened(false);
        }}
      >
        {isOpened && Object.values(SortingOption).map((type: string) =>
          (<li className={`places__option ${sortType === type ? 'places__option--active' : ''}`} key={type} tabIndex={0} >{type}</li>))}
      </ul>
    </form>
  );
}

export default memo(SortOptions);
