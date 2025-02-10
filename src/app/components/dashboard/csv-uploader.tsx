"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import {
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    TablePagination,
    TextField,
} from "@mui/material"
import { UploadFile } from "@mui/icons-material"
import Papa from "papaparse"

interface CSVData {
    [key: string]: string | number
}

export default function CSVUploader() {
    const [data, setData] = useState<CSVData[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchTerm, setSearchTerm] = useState("")

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setLoading(true)
        setError(null)

        const reader = new FileReader()

        reader.onload = (e) => {
            const text = e.target?.result as string

            Papa.parse<CSVData>(text, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (result: { data: React.SetStateAction<CSVData[]> }) => {
                    setData(result.data)
                    setLoading(false)
                },
                error: (err: any) => {
                    console.error("Error parsing CSV file:", err)
                    setError("Error parsing CSV file. Please make sure it's a valid CSV.")
                    setLoading(false)
                },
            })
        }

        reader.readAsText(file)
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        setPage(0)
    }

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            Object.values(row).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
        )
    }, [data, searchTerm])

    const paginatedData = useMemo(() => {
        const startIndex = page * rowsPerPage
        return filteredData.slice(startIndex, startIndex + rowsPerPage)
    }, [filteredData, page, rowsPerPage])

    return (
        <Box sx={{ maxWidth: 1200, padding: "20px", margin: "auto" }}>
            <input
                accept=".csv"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={handleFileUpload}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" startIcon={<UploadFile />} disabled={loading}>
                    Upload CSV File
                </Button>
            </label>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {data.length > 0 && (
                <>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{
                            marginTop:"20px",
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '& legend': {
                                    color: 'white',
                                },
                                '& input': {
                                    color: 'white',
                                    '&::placeholder': {
                                        color: 'white',
                                    },
                                },
                            },
                            '& .MuiFormLabel-root': {
                                color: 'white',
                            },
                        }}
                    />
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="csv data table">
                            <TableHead>
                                <TableRow>
                                    {Object.keys(data[0]).map((key) => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((row, index) => (
                                    <TableRow key={index}>
                                        {Object.values(row).map((value, cellIndex) => (
                                            <TableCell key={cellIndex}>{value as string}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </Box>
    )
}
