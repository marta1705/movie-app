import React from 'react'
import Pagination from '@mui/material/Pagination'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
      mode: 'dark', // Use 'mode' instead of 'type' for the theme
      text: {
        primary: '#ffffff', // Text color of the Pagination component
      },
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#ffffff',
              backgroundColor: '#4D4D4D',
            },
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

