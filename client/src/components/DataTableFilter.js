import React from "react";
import MyInput from "./MyInput/MyInput";
import MySelect from "./MySelect/MySelect";

function DataTableFilter({ filter, setFilter }) {
    return (
        <div>
            <MyInput
                type='text'
                placeholder='Поиск...'
                value={filter.query}
                onChange={(e) =>
                    setFilter({ ...filter, query: e.target.value })
                }
            />
            <MySelect
                value={filter.sort}
                onChange={(selectedSort) =>
                    setFilter({ ...filter, sort: selectedSort })
                }
                defaultValue='Сортировка по'
                options={[
                    { value: "Fullname", name: "По имени" },
                    { value: "total", name: "По общему времени" },
                ]}
            />
        </div>
    );
}

export default DataTableFilter;
