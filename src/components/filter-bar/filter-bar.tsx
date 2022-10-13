import { useMemo } from "react";
import styles from "./filter-bar.module.scss";


const itemSize = 175;
export interface ITabItem {
  id: string | number;
  label: string;
}

export interface IFilterBarProps {
  items: ITabItem[];
  onChange: (item: ITabItem, index: number) => void;
  selectedIndex: number;
}

const FilterBar = ({items, onChange, selectedIndex}: IFilterBarProps) => {
  const highlightStyle = useMemo(() => {
    const itemOffset = (itemSize * selectedIndex);
    const leftPos = `calc(2rem + ${itemOffset}px + ${selectedIndex}rem)`;
    return { left: leftPos, width: itemSize };
  }, [selectedIndex]);

  const itemClicked = (item : ITabItem, index : number) => () => {
    onChange(item, index);
  }

  return (
    <div className={`flex justify-items-center gap-4 py-2 px-8 relative ${styles.typeFilter}`}>
      <div className={`${styles.typeFilterHighlight} py-2 px-4 rounded-[8px]`} style={highlightStyle} />
      {items.map((item, index) => 
        <div key={index} className={`${styles.typeFilterItem} text-center py-2 px-2 rounded-[8px] bg-white`} style={{width: itemSize}} onClick={itemClicked(item, index)}>{item.label}</div>
      )}
    </div>
  );
}

export default FilterBar;