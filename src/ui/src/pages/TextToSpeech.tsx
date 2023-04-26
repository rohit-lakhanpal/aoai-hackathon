import React, {ReactElement, FC, useState, useEffect} from "react";
import {Box, Button, Container, Typography, Grid, LinearProgress, Paper, Stack, Alert, TextField } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { speechService } from '../services/speechService';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

const TextToSpeech: FC<any> = (): ReactElement => {
    const [lastWordOffset, setLastWordOffset] = useState<number>(0);
    const [wordsSpoken, setWordsSpoken] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);    
    const [synthesiser, setSynthesiser] = useState<any>(null);
    const [player, setPlayer] = useState<any>(null);
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

    const beginSpeaking = async () => {
        if (transcript.length === 0) {
            setErrors((prev:any) => {
                return [...prev, 'Transcript is empty, nothing to speak!'];
            });
        } else {
            //await initialise();
            setIsSpeaking(true);                      
            synthesiser.speakTextAsync(transcript, (result: any) => {
                if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");                    
                } else {
                    console.error("Speech synthesis cancelled, " + result.errorDetails +
                        "\nDid you update the subscription info?");  
                        
                    setIsSpeaking(false);                  
                }
            }, (err: string) => {
                console.error(err);
                setErrors((prev:any) => {
                    return [...prev, err];
                });
                setIsSpeaking(false);
            });

        }
    };

    const stopSpeaking = async () => {
        setIsSpeaking(false);                  
        player.pause();
    };

    const reload = async () => {
        window.location.reload();
    };

    const onWordBoundary = (sender: any, event: {privText:string, privAudioOffset: number, privDuration: number}) => {
        var wordOffset = event.privAudioOffset / 10000;
        wordOffset += 1000; // adding buffer
        setLastWordOffset(wordOffset)
        setTimeout(() => {
            // YOUR_CODE_HERE
            setWordsSpoken((prev:string) => {
                return prev + " " + event.privText;
            });
        }, wordOffset);
    }

    const onSynthesisCompleted = () => {        
        setTimeout(() => {
            // setWordsSpoken('');
            setIsSpeaking(false);
        }, (lastWordOffset));
    }

    const initialise = async () => {
        try {
            // Create an instance of the speech recogniser     
            var initialisationResult = await speechService.initialiseSynthesizerAsync(onSynthesisCompleted, onWordBoundary)   
            setSynthesiser(initialisationResult?.synthesizer);
            setPlayer(initialisationResult?.player);
        } catch (error: any) {
            setErrors((prev:any) => {
                return [...prev, error.message];
            });
        }
        
    };

    useEffect(() => {
        initialise();
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
                            Text to Speech
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
                                    disabled={isSpeaking}
                                />
                            </Paper>                                                        
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={beginSpeaking}
                            variant="contained"
                            startIcon={<CampaignIcon />}
                            style={{
                                marginRight: '1rem'
                            }}
                            >
                            Begin speaking ...
                        </Button>
                                            
                        <Button onClick={stopSpeaking}
                            variant="contained"
                            color="error"
                            startIcon={<CampaignIcon />}
                            style={{
                                marginRight: '1rem'
                            }}
                            >
                            Stop speaking!
                        </Button>

                        <Button onClick={reload}
                            variant="contained"
                            color="warning"
                            startIcon={<CampaignIcon />}>
                            Reset.
                        </Button>
                        <Box hidden={!isSpeaking}>
                            <Alert severity="info">
                                Speaking in progress!
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
                            label="Spoken words will appear here ..."
                            multiline
                            fullWidth                                    
                            disabled={true}
                            value={wordsSpoken}
                            style={{
                                marginTop: '1rem'
                            }}
                        />
                    </Grid>                    
                </Grid>
            </Container>
        </Box>
    );
};

export default TextToSpeech;