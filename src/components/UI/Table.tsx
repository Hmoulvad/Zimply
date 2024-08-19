import { css, cx } from "hono/css";
import type { Child } from "hono/jsx";
import Typography from "./Typography";

type Column<T> = {
  label: Child | string;
  value: (row: T) => Child;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export default function Table<T extends { [key: string]: any }>({
  columns,
  data,
}: Props<T>) {
  return (
    <div className={container}>
      <table className={table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${String(column.label)}-${index}`}>
                {typeof column.label !== "object" ? (
                  <Typography>{column.label}</Typography>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, index) => (
                <td
                  key={`${String(column.label)}-${index}`}
                  className={cx(rowIndex % 2 === 0 && isEven)}
                >
                  {typeof column.value(row) !== "object" ? (
                    <Typography>{column.value(row)}</Typography>
                  ) : (
                    column.value(row)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const container = css`
  overflow-x: auto;
`;

const table = css`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
  thead {
    background-color: var(--gray-3);
    tr th {
      white-space: nowrap;
      text-align: left;
      padding: var(--size-3);
    }
  }
  tbody {
    tr {
      td {
        white-space: nowrap;
        text-align: left;
        padding: var(--size-3);
        background-color: var(--primary-color);
      }
    }
  }
`;

const isEven = css`
  background-color: var(--gray-1);
`;
