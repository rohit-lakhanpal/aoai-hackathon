// pages
import Home from "../pages/Home";
import SpeechToText from "../pages/SpeechToText";
import TextToSpeech from "../pages/TextToSpeech";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'speech-to-text-route',
        title: 'Speech to Text',
        path: '/speech-to-text',
        enabled: true,
        component: SpeechToText
    },
    {
        key: 'text-to-speech-route',
        title: 'Text to Speech',
        path: '/text-to-speech',
        enabled: true,
        component: TextToSpeech
    }
]