import React, {ReactElement, FC} from "react";
import {Box, Typography, Link, colors} from "@mui/material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { config } from "../utilities/config";

const Home: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "2rem",
        }}> 
            <Typography variant="h3" style={{verticalAlign:'middle', display: 'inline-flex'}} >
                <RecordVoiceOverIcon fontSize="inherit" /> 
                &nbsp;
                {config.app.name}
            </Typography>            
            <Typography variant="h5" style={{margin : '2rem', paddingTop: '2rem', textAlign: 'center'}}>
                {config.app.description}
            
                This app relies on apis published via the shared-apis project within this repo.                             
                Please ensure that the shared-apis project is running before attempting to use this app.                           
            </Typography>
            <Typography variant="h5" style={{textAlign: 'center'}}>                
                Requests to <code style={{color: colors.purple[500]}}>/api</code> are proxied to the shared-apis 
                project at {' '}<code><Link target="_blank" href="http://localhost:8085/api">http://localhost:8085/api</Link></code>.                 
            </Typography>
        </Box>
    );
};

export default Home;