import { List } from "@telegram-apps/telegram-ui";
import { Key } from "react";

type GridListProps<Item> = {
  items: Item[];
  renderItem: (item: Item, index: number) => React.ReactNode;
  keyExtractor: (item: Item) => Key;
  cols: number;
}

const GridList = <Item,>({items, renderItem, keyExtractor, cols}: GridListProps<Item>): JSX.Element => {
  const rows = Math.ceil(items.length / cols);
  const slots = [];
  for(let i = 0; i < rows; ++i) {
    const row = [];
    for(let j = i * cols; j < (i * cols + cols) && j < items.length; ++j) {
      const item = items[j];
      const listItem = renderItem(item, j);
      const key = keyExtractor(item)
      row.push(<div key={key}>{listItem}</div>);
    }
    slots.push(<List
      key={i}
      style={{
        //background: 'var(--tgui--secondary_bg_color)',
        padding: 0
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 16
        }}
      >
        {...row}
        </div></List>);
  }
  return (<List>
    {...slots}
  </List>);
}

export default GridList;