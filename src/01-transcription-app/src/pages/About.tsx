import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";

const About: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
            <Typography variant="h3">About</Typography>  

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue. Nullam id dolor id nibh
                ultricies vehicula ut id elit. Nullam quis risus eget urna mollis
                ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut.

            
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue. Nullam id dolor id nibh
                ultricies vehicula ut id elit. Nullam quis risus eget urna mollis
                ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut.

            
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue. Nullam id dolor id nibh
                ultricies vehicula ut id elit. Nullam quis risus eget urna mollis
                ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut.

            
            </p>
        </Box>
    );
};

export default About;