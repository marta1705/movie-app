import React from 'react'
import Pagination from '@mui/material/Pagination'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#1976d2', // Primary color for Pagination buttons
        },
        background: {
            default: '#121212', // Background color of the Pagination component
        },
        text: {
            primary: '#ffffff', // Text color of the Pagination component
        },
    },
    components: {
        MuiPagination: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Override text color of Pagination buttons
                    '& .Mui-selected': {
                        bgcolor: '#1976d2', // Override background color of selected Pagination button
                        color: '#ffffff', // Override text color of selected Pagination button
                    }
                },

            },
        },
    },
});

export default function PaginationComponent({setPage, numOfPages = 500, currentPage = 1}) {

    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0, 0);
    }

  return (
    <div 
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
        }}        
    >
        <ThemeProvider theme={theme}>
        <Pagination
            onChange={(e, page) => handlePageChange(page)}
            count={numOfPages}
            page={currentPage}
            hideNextButton
            hidePrevButton
        />
        </ThemeProvider>
    </div>
  )
}

