import { useMemo, useState } from "react";
import { IArticle } from "../../utilities/app-types";
import { onlyUniqueFilter } from "../../utilities/string-utilities";

export interface ICategoryFilterProps {
  articles: IArticle[];
  maxCount?: number;
  onChange: (category: string) => void;
}

const CategoryFilter : React.FC<ICategoryFilterProps> = ({articles, maxCount = 6, onChange}) => {
  
  const categories = useMemo<string[]>(() => {
    if(!articles || articles.length === 0) return ["All"];
    const cats = articles.flatMap(i => i.category ?? []).filter(onlyUniqueFilter);
    return ["All", ...cats].slice(0, maxCount -1);
  }, [articles, maxCount]);

  const [category, setCategory] = useState(categories[0]);

  const onClick = (item: string) => () => {
    setCategory(item);
    onChange(item);
  }

  return (
    <div className="flex flex-wrap sm:no-wrap justify-center gap-y-4 px-4 py-2 font-light">
      {categories.map((cat, idx) => (
        <div key={idx} className={`uppercase slide-up-sm mx-2 ${cat === category ? 'text-sky-500' : ' cursor-pointer hover:text-sky-300'}`} onClick={onClick(cat)}>{cat}</div>
      ))}
    </div>
  );
}

export default CategoryFilter;