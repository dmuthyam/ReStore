import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useState } from 'react';

interface Props {
  items: any[];
  onChange: (items: string[]) => void;
  checked?: string[];
}

export default function CheckboxButtons({ items, onChange, checked }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newCheckedItems: string[] = [];
    if (currentIndex === -1) {
      newCheckedItems = [...checkedItems, value];
    } else {
      newCheckedItems = checkedItems.filter((item) => item !== value);
    }
    setCheckedItems(newCheckedItems);
    onChange(newCheckedItems);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel 
        control={<Checkbox 
                    checked={checkedItems.indexOf(item)!==-1} 
                    onClick={()=>handleChecked(item)}
                 />} 
        label={item} 
        key={item} />
      ))}
    </FormGroup>
  );
}
