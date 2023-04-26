import React, {ReactElement, FC, useState} from "react";
import {Box, Container, Typography, Grid, Paper, TextField, Button, Alert, LinearProgress, Stack, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {languageService } from '../services/languageService';

const TextAnalysis: FC<any> = (): ReactElement => {
    const [transcript, setTranscript] = useState<string>('');
    const [analysisType, setAnalysisType] = useState<string>('');
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [analysedTranscript, setAnalysedTranscript] = useState<string>('');
    const [errors, setErrors] = useState<any>([]);
    const [warnings, setWarnings] = useState<any>([]);

    

    const binErrors = (idx: number) => {
        // remove the warning at idx
        setErrors((prev:any) => {
            return prev.filter((e:any, i:number) => {
                return i !== idx;
            })
        });
    }   
    const binWarnings = (idx: number) => {
        // remove the warning at idx
        setWarnings((prev:any) => {
            return prev.filter((e:any, i:number) => {
                return i !== idx;
            })
        });
    }

    const beginAnalysis = async () => {
        if (transcript.length === 0) {
            setErrors((prev:any) => {
                return [...prev, 'Transcript is empty, nothing to analyse!'];
            });
        } else {
            if(analysisType === undefined || analysisType.length === 0){
                setErrors((prev:any) => {
                    return [...prev, 'Choose an analysis type to conduct!'];
                }); 
            } else {
                setIsAnalysing(true);
                try {
                    var result = await languageService.analyseTextAsync(transcript, analysisType);                    
                    setAnalysedTranscript(result);
                } catch (error) {
                    console.log(error);
                    setErrors((prev:any) => {
                        return [...prev, "Error analysing text."];
                    });
                } finally {
                    setIsAnalysing(false);
                }
            }
            
            
        }
    };

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
           <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            <QueryStatsIcon fontSize="inherit" style={{verticalAlign:'middle', display: 'inline-flex'}} />
                            {' '}
                            Text Analysis
                        </Typography>
                    </Grid>
                    <Grid item xs={12}> 
                            <Paper elevation={1} style={{
                                padding: '1rem',
                            }}>                            
                                <Typography variant="h4" style={{paddingBottom: '1rem'}}>
                                    Transcript:
                                </Typography>
                                <TextField                                    
                                    label="Your transcription goes here ..."
                                    multiline
                                    fullWidth
                                    onChange={(e) => {
                                        setTranscript(e.target.value);
                                    }}
                                />
                            </Paper>                                                        
                    </Grid>
                    <Grid item xs={12}>  
                        <FormControl fullWidth>
                            <InputLabel id="analysis-label">Choose analysis type</InputLabel>
                            <Select
                                labelId="analysis-label"                                   
                                value={analysisType}
                                label="Choose analysis type"
                                style={{                                        
                                    marginBottom: '1rem'
                                }}
                                onChange={(v)=>{
                                    setAnalysisType(v.target.value);
                                }}
                                >
                                <MenuItem value={'analyse-sentiment'}>Analyse Sentiment</MenuItem>
                                <MenuItem value={'extract-key-phrases'}>Extract Key Phrases</MenuItem>
                                <MenuItem value={'recognise-entities'}>Recognise Entities</MenuItem>
                                <MenuItem value={'recognise-healthcare-entities'}>Recognise Entities (Healthcare)</MenuItem>
                                <MenuItem value={'recognise-pii'}>Recognise Pii</MenuItem>                             
                            </Select>
                        </FormControl>               
                        <Button onClick={beginAnalysis}
                            variant="contained"                                
                            style={{
                                marginRight: '1rem'
                            }}
                            startIcon={<QueryStatsIcon />}
                            >
                            Begin analysis ...
                        </Button>
                                            
                        <Button onClick={()=>{
                            setTranscript('');
                            setAnalysedTranscript('');
                            setAnalysisType('');
                            setIsAnalysing(false);
                        }}
                            variant="contained"
                            color="secondary"
                            >
                            Reset.
                        </Button>
                        <Box hidden={!isAnalysing}>
                            <Alert severity="info">
                                Analysis in progress!
                            </Alert>
                            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>                                
                                    <LinearProgress color="info" />
                            </Stack>
                        </Box>
                        <Box hidden={errors.length < 1}>
                            {errors.map((e: any, i: number) => {
                                return <Alert key={i} severity="error" onClose={() => binErrors(i)}>
                                    {e}
                                </Alert>
                            })}
                        </Box>
                        <Box hidden={warnings.length < 1}>
                            {warnings.map((e: any, i: number) => {
                                return <Alert key={i} severity="warning" onClose={()=>binWarnings(i)}>
                                    {e}
                                </Alert>
                            })}
                        </Box>
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField                                    
                            label="Analysed text will appear here ..."
                            multiline
                            fullWidth                                    
                            disabled={true}
                            value={analysedTranscript}
                            style={{
                                marginTop: '1rem',                                
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default TextAnalysis;