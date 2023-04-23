import React, {ReactElement, FC, useState, useEffect} from "react";
import {Box, Button, Container, Typography, Grid, LinearProgress, Paper, Stack, Alert, Snackbar } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { speechService } from '../services/speechService';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

const SpeechToText: FC<any> = (): ReactElement => {
    const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
    const [transcription, setTranscription] = useState<any>([]);
    const [recogniser, setRecogniser] = useState<any>(null);
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
    const onRecognised = (s: any, e: { result: { reason: speechsdk.ResultReason; text: React.SetStateAction<string>; }; }) => {
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
            console.log(`RECOGNIZED: Text=${e.result.text}`);
            setTranscription((prev:any) => {
                return [...prev, e.result.text];
            })
        } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
            console.log("NOMATCH: Speech could not be recognized.");
        }
    };
    const onCancelled = (s: any, e: { reason: any; }) => {
        console.log(`CANCELED: Reason=${e.reason}`);
    };
    const onSessionStarted = (s: any, e: any) => {
        console.log("\n    Session started event.");
    };
    const onSessionStopped = (s: any, e: any) => {
        console.log("Session stopped event.");
        console.log("Stop recognition.");
        recogniser.stopContinuousRecognitionAsync();
    };    
    const toggleTranscription = async () => {
        if (isTranscribing) {
            if(recogniser !== null)
                await recogniser.stopContinuousRecognitionAsync();
        } else {
            if(recogniser !== null)
                await recogniser.startContinuousRecognitionAsync();
        }
        setIsTranscribing(!isTranscribing);
    };

    const initalise = async () => {
        try {
            let recogniser = await speechService.initialiseRecogniserAsync(onRecognised, onCancelled, onSessionStarted, onSessionStopped);
            setRecogniser(recogniser);    
        } catch (error: any) {
            setErrors((prev:any) => {
                return [...prev, error.message];
            })
        }
    };
    
    useEffect(() => {
        initalise();
    }, []);

    
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
                            <RecordVoiceOverIcon fontSize="inherit" style={{verticalAlign:'middle', display: 'inline-flex'}} />
                            {' '}
                            Audio Transcription in Real Time
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography hidden={isTranscribing} variant="body1">                            
                            <Button onClick={toggleTranscription}
                                variant="contained"
                                startIcon={<MicIcon />}>
                                Begin transcription
                            </Button>
                        </Typography>
                        <Typography hidden={!isTranscribing} variant="body1">                            
                            <Button onClick={toggleTranscription}
                                variant="contained"
                                color="error"
                                startIcon={<MicIcon />}>
                                Stop transcription
                            </Button>
                        </Typography>
                        <Box hidden={!isTranscribing}>
                            <Alert severity="info">
                                Transcription in progress!
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
                        <Paper elevation={1} style={{
                            padding: '1rem',
                        }}>                                                        
                            <Typography variant="h4" style={{paddingBottom: '1rem'}}>
                                Transcription:                                
                            </Typography>
                            {transcription.map((t: any, i: number) => {
                                return <Typography key={i} variant="body1" style={{
                                    paddingBottom:'5px',
                                    marginLeft: '5px',
                                }}>{t}</Typography>
                            })}
                            <Button 
                                onClick={() => {
                                    navigator.clipboard.writeText(transcription.join(' '))
                                }}
                                hidden={transcription.length < 1}
                                variant="outlined"
                                color="primary"
                                startIcon={<ContentCopyIcon />}>
                                Copy Content to Clipboard
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SpeechToText;