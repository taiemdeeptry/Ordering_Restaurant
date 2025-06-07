import React, { createContext, useState, useContext } from "react";

const TableContext = createContext();

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTable must be used within a TableProvider");
    }
    return context;
};

export const TableProvider = ({ children }) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedTableType, setSelectedTableType] = useState(null);

    const tableTypes = [
        { id: "2-seater", name: "Bàn 2 người", capacity: 2, count: 10 },
        { id: "5-seater", name: "Bàn 5 người", capacity: 5, count: 5 },
        { id: "8-seater", name: "Bàn 8 người", capacity: 8, count: 3 },
        { id: "12-seater", name: "Bàn 12 người", capacity: 12, count: 2 },
    ];

    const generateTables = () => {
        return tableTypes.flatMap((type) =>
            Array.from({ length: type.count }, (_, i) => ({
                id: `${type.id}-${i + 1}`,
                number: i + 1,
                type: type.id,
                capacity: type.capacity,
                isOccupied: false,
            }))
        );
    };

    const tables = generateTables();

    const getAvailableTables = (type) => {
        return tables.filter((table) => table.type === type && !table.isOccupied);
    };

    const value = {
        selectedTable,
        setSelectedTable,
        selectedTableType,
        setSelectedTableType,
        tableTypes,
        tables,
        getAvailableTables,
    };

    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};
