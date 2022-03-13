import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@material-ui/core/Grid';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Paper from '@mui/material/Paper';
import { Wind } from "react-feather";
import useFitText from "use-fit-text";
import { useParams } from 'react-router-dom';
import islamBackground from '../images/islamBackground.jpg';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: '100%',
    '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.css-py33p5-MuiPaper-root': {
        fontColor: 'white'
    },
    transparent: '40%',
    border: 'solid',
    borderWidth: '2px',
    borderColor: 'rgb(255,215,0,0.89)'

}));



function Times() {



    const { fontSize, ref } = useFitText();

    const { id } = useParams();

    const [prayerTimes, setPrayerTimes] = useState([]);
    //prayerTimes
    const [fajr, setFajr] = useState();
    const [sunrise, setSunrise] = useState();
    const [dhuhr, setDhuhr] = useState();
    const [asr, setAsr] = useState();
    const [maghrib, setMaghrib] = useState();
    const [isha, setIsha] = useState();

    const [dailyTimes, setDailyTimes] = useState([]);


    //for countdown
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval;


    //for clock
    const [currentTime, setCurrentTime] = useState(new Date());




    const startTimer = () => {

        const countDownDate = (new Date(new Date().toDateString() + ' ' + maghrib + ':01'));

        interval = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            const hours = Math.floor(
                (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (distance % (60 * 60 * 1000)) / (1000 * 60)
            );

            const seconds = Math.floor(
                (distance % (60 * 1000)) / 1000
            )

            if (distance < 0) {

                //stop timer
                clearInterval(interval.current);
                //pick next Timer in array to display
            } else {
                //update timer
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
                // console.log(asr)
            }
        }, 1000);
    };


    function refreshClock() {
        setCurrentTime(new Date());
    }


    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = day + '.' + month + '.' + today.getFullYear();


    const getPrayerTimes = async () => {
        const response = await fetch(
            `https://ezanvakti.herokuapp.com/vakitler/${id}`
        );
        const data = await response.json();
        setPrayerTimes(data);
    }


    useEffect(() => {
        getPrayerTimes();
    }, []);

    useEffect(() => {

        if (prayerTimes[0]) {
            setFajr(prayerTimes[0].Imsak);
            setSunrise(prayerTimes[0].Gunes);
            setDhuhr(prayerTimes[0].Ogle);
            setAsr(prayerTimes[0].Ikindi);
            setMaghrib(prayerTimes[0].Aksam);
            setIsha(prayerTimes[0].Yatsi);
            console.log(1);

        }

        console.log(2);


    }, [prayerTimes])

    useEffect(() => {
        if (isha) {
            startTimer();
            setInterval(refreshClock, 1000);


        }
    }, [isha]);

    useEffect(() => {
        if (isha) {
            //add all prayers in one array
            console.log('1')
            setDailyTimes(fajr);
            setDailyTimes(oldArray => [...oldArray, sunrise]);
            setDailyTimes(oldArray => [...oldArray, dhuhr]);
            setDailyTimes(oldArray => [...oldArray, asr]);
            setDailyTimes(oldArray => [...oldArray, maghrib]);
            setDailyTimes(oldArray => [...oldArray, isha]);

            console.log(dailyTimes);
            // 

        }
    }, [isha]);


    return (
        <div style={{
            backgroundColor: '#E9F5DB', minHeight: '100vh', marginTop: -9,
            backgroundImage: `url(${islamBackground})`
        }} >


            <RemoveScrollBar />
            <Grid container spacing={5} style={{
                width: '98%', marginLeft: '1%',
                marginTop: 10,
            }}>


                <Grid id='title' item xs={12} style={{ backgroundColor: '', height: '16.5vh', marginBottom: '', fontColor: 'white' }}>
                    <Item style={{ fontSize: '8vh', lineHeight: 'auto' }}>

                        <div style={{ float: 'left', marginLeft: '10%' }}>Münster</div>
                        <div style={{ float: 'right', marginRight: '5%', marginTop: '-1%', fontSize: '7vh' }}>{date}</div>
                        <div style={{ width: '100%', height: '1%' }} />
                        <div style={{ float: 'right', marginRight: '-15%', fontSize: '4vh', marginTop: '55px', }}>4.8.1443</div>

                    </Item>
                </Grid>

                <Grid id='imsak' item xs={3} style={{
                    backgroundColor: '', height: '16.5vh', marginBottom: '',
                    marginRight: '',
                }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        <div style={{}}>Imsak</div>
                        <div style={{}}>{fajr}</div>

                    </Item>


                </Grid>

                <Grid id='günes' item xs={3} style={{
                    backgroundColor: '',
                    height: '16.5vh', marginBottom: '', width: '98%'
                }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        <div style={{}}>Günes</div>
                        <div style={{}}>{sunrise}</div>

                    </Item>

                </Grid>

                <Grid id='uhrzeit' item xs={6} style={{ backgroundColor: '', height: '16.5vh', marginBottom: '' }}>
                    <Item style={{ fontSize: '10vh', lineHeight: '11.5vh' }}>
                        {/* 
                        <Clock /> */}

                        {/* <Clock /> */}
                        {currentTime.toLocaleTimeString()}

                    </Item>
                </Grid>

                <Grid id='ögle' item xs={3} style={{ backgroundColor: '', height: '16.5vh', marginBottom: '' }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        <div style={{}}>Ögle</div>
                        <div style={{}}>{dhuhr}</div>

                    </Item>
                </Grid>

                <Grid id='ikindi' item xs={3} style={{ backgroundColor: '', height: '16.5vh', marginBottom: '' }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        <div style={{}}>Ikindi</div>
                        <div style={{}}>{asr}</div>

                    </Item>
                </Grid>

                <Grid id='wetter' item xs={2} style={{ backgroundColor: '', height: '33vh', }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        {/* <div style={{ marginTop: '2vh', marginLeft: '1vh', textAlign: 'left', float: 'left' }}> <Sunrise style={{ height: '7vh', width: '7vh' }} /></div>
              <div style={{ fontSize: '5vh', float: 'right', marginTop: '2vh', marginRight: '0.4vh', width: 'auto', textAlign: 'center' }}> 23:29 </div>
  
              <div style={{ marginTop: '1vh', marginLeft: '1vh', float: 'left', width: '100%', textAlign: 'left' }}> <Sunset style={{ height: '7vh', width: '7vh' }} /> </div>
              <div style={{ fontSize: '5vh', float: 'right', marginTop: '-8vh', marginRight: '0.4vh', width: 'auto', textAlign: 'center' }}> 23:29 </div> */}

                        <img
                            src="http://namazvakti.diyanet.gov.tr/images/d2.gif"
                            alt="new"
                            style={{ height: '15vh', marginTop: '1vh' }}
                        />

                        <div style={{ fontSize: '7vh', marginLeft: '1vh', float: 'left' }}> <Wind style={{ height: '7vh', width: '7vh', }} /></div>

                        <div style={{ fontSize: '6vh', float: 'right', marginTop: '-0.3vh', marginRight: '1vh' }}> 10°</div>

                    </Item>

                </Grid>

                <Grid id='nächstesGebet' item xs={4} style={{ backgroundColor: '', height: '33vh', marginBottom: '' }}>
                    <Item style={{ fontSize: '6vh', lineHeight: 'auto' }}>

                        <div style={{}}>Ikindi</div>
                        <div style={{ backgroundColor: '#505e65', height: 2, width: '90%', marginLeft: '5%' }} />
                        <div style={{}}>ikindi</div>
                        <div style={{ backgroundColor: '#505e65', height: 2, width: '90%', marginLeft: '5%' }} />


                        {/* <Countdown date={Date.now() + (diff)}
                intervalDelay={0} /> */}
                        {/*   
              <MCCountdown endDate={teste} /> */}

                        {/* {counter} */}

                        <div>
                            {timerHours < 10 && 0}{timerHours}:{timerMinutes < 10 && 0}{timerMinutes}:{timerSeconds < 10 && 0}{timerSeconds}</div>


                        {/* 
                        <Countdown date={new Date('2022-03-07T20:05:00.000Z').getTime()} intervalDelay={0}
                            precision={0} /> */}
                    </Item>
                </Grid>

                <Grid id='aksam' item xs={3} style={{ backgroundColor: '', height: '16.5vh', marginBottom: '1%', marginTop: '-16.5vh' }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        <div style={{}}>Aksam</div>
                        <div style={{}}>{maghrib}</div>

                    </Item>
                </Grid>

                <Grid id='yatsi' item xs={3} style={{ backgroundColor: '', height: '16.5vh', marginBottom: '1%', marginTop: '-16.5vh' }}>
                    <Item style={{ fontSize: '4vh', lineHeight: 'auto' }}>

                        <div style={{}}>Yatsi</div>
                        <div style={{}}>{isha}</div>

                    </Item>
                </Grid>



                <Grid item xs={12} style={{ backgroundColor: '', height: '29.5vh', marginTop: '-2vh' }}>
                    <Item style={{ lineHeight: 'auto', height: '100%', fontSize: '4vh' }}>


                        <div ref={ref} style={{ fontSize, height: '100%', width: '100%' }}>
                            Ebû Şurayh (r.a.)'dan. Hz. Peygamber (s.a.v) şöyle buyurmuştur:
                            Kim, Allah'a ve âhiret gününe inanıyorsa misafirine mükâfatını ikram etsin Oradakiler:
                            Ey Allah'ın Rasûlü, misafirin mükâfatı ne kadardır? diye sordular:
                            Gece ve gündüzü ile bir günlüktür. Misafirlik üç gündür, bundan gerisi sadakadır. buyurdu.
              </div>



                    </Item>

                </Grid>

            </Grid>



        </div >
    )
}

export default Times;

