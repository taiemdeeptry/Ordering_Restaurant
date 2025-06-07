import React from "react";
import { Box, Typography, Button, Grid, Paper, Chip } from "@mui/material";
import { useTable } from "../context/TableContext";

const TableSelection = () => {
    const { selectedTable, setSelectedTable, selectedTableType, setSelectedTableType, tableTypes, getAvailableTables } = useTable();

    const handleTableTypeSelect = (type) => {
        setSelectedTableType(type);
        setSelectedTable(null);
    };

    const handleTableSelect = (table) => {
        setSelectedTable(table);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Chọn bàn
            </Typography>

            {!selectedTableType ? (
                <Grid container spacing={2}>
                    {tableTypes.map((type) => (
                        <Grid item xs={12} sm={6} md={3} key={type.id}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                                onClick={() => handleTableTypeSelect(type.id)}
                            >
                                <Typography variant="h6">{type.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {type.count} bàn
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>
                    <Button variant="outlined" onClick={() => setSelectedTableType(null)} sx={{ mb: 2 }}>
                        Quay lại
                    </Button>

                    <Typography variant="h6" gutterBottom>
                        Chọn bàn {tableTypes.find((t) => t.id === selectedTableType).name}
                    </Typography>

                    <Grid container spacing={2}>
                        {getAvailableTables(selectedTableType).map((table) => (
                            <Grid item xs={12} sm={6} md={4} key={table.id}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        backgroundColor: selectedTable?.id === table.id ? "primary.light" : "background.paper",
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                        },
                                    }}
                                    onClick={() => handleTableSelect(table)}
                                >
                                    <Typography variant="h6">Bàn {table.number}</Typography>
                                    <Chip label={`${table.capacity} người`} size="small" sx={{ mt: 1 }} />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default TableSelection;
