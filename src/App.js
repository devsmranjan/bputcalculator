import React from 'react';
import 'typeface-special-elite';
import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';
import TabPanel from './components/TabPanel';
import Header from './components/Header';
import SGPA from './components/SGPA/SGPA';
import CGPA from './components/CGPA/CGPA';
import Percentage from './components/percentage/Percentage';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50'
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00'
        },
        type: 'light'
    },
    typography: {
        fontFamily: ['Poppins', 'Special Elite'].join(',')
    }
});

const App = () => {
    // Tabs
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header handleTabChange={handleTabChange} tabValue={tabValue} />
            <TabPanel value={tabValue} index={0}>
                <SGPA />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <CGPA />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Percentage />
            </TabPanel>
        </ThemeProvider>
    );
};

export default App;
