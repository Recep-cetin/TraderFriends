import React from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import { useEffect, useRef } from "react";
import '../css/index.css'
import '../css/csspop.css'
import "../css/Coins.css"
import { ssembol, indi, indilist, inbot, timeIntervals } from "./list.jsx";
import { useState } from "react";
import axios from 'axios'
import indiimg from "../image/indicator.png"
import fotoimg from "../image/camera.png"
import star from "../image/star.png"
import bin from "../image/binance.png"
import candle from "../image/candle.png"
import kpt from "../image/kpt.png"
import mntrd from "../icon/mntrd.png"
import html2canvas from "html2canvas";
import io from 'socket.io-client';
import home from "../icon/home.svg"
import chat from "../icon/Chat.svg"
import terminal from "../icon/terminal.svg"
import vetor from "../icon/Vector.svg"
import watch from "../icon/watch.svg"
import setting from "../icon/Setting.svg"
import exit from "../icon/exit.png"
import { Outlet, Link } from "react-router-dom";

{/* <a href="" title="camera icons">Camera icons created by Freepik - Flaticon</a> */ }

function MarketSymbol() {
    return ["BTCUSDT"]
}

function TimeInterval() {
    return ["1h"];
}

const getData = async (sembol = MarketSymbol(), interval = TimeInterval()) => {
    /*  console.log(`http://127.0.0.1:5000/${sembol}/${interval}`); */
    const resp = await fetch('https://traderclub.herokuapp.com/' + sembol + '/' + interval + '');
    const data = await resp.json();
    return data;
};

const Dene = () => {
    const ref = useRef();
    const [sembol, Setsembol] = useState("BTCUSDT")
    const [interval, Setintervall] = useState("1h")
    const [coins, setCoins] = useState([])
    const [ma, Setma] = useState(0)
    const [showtime, setShowtime] = useState(false);
    const [showsembol, setShowsembol] = useState(false);
    const [showindi, setShowindi] = useState(false);
    const [slide, Setslide] = useState(false);
    const [cnumber, Setcnumber] = useState(2)


    const addindi = (props) => {
        try {
            let top = 0;
            for (let a = 0; a < indi.length; a++) {
                if (indi[a].name === props) {
                    console.log("eklemek istediğiniz indi zaten açık");
                    top = 1; break;
                }
            }
            if (top === 0) {
                indi.push({ name: props });
                Setma(ma + 1)
                console.log("nesne inditop eklendi");
            } else {

            }
        } catch (error) {

        }
    }

    let dizi = [];
    const inlistfont = (props) => {
        for (let i = 0; i < inbot.length; i++) {
            if (props === inbot[i].name) {
                dizi.push(inbot[i].name)
                //    console.log("ama bu bana uygun : " + inbot[i].name);   
            } else {
                // console.log("la bu bana uygun  degil : " + inbot[i].name);  
            }
        }

        for (let a = 0; a < dizi.length; a++) {
            if (props === dizi[a]) {
                let get = dizi[a].slice(0, 5);
                let uz = 300 + (a * 200);
                const bul = document.getElementById(get)
                bul.style.display = "flex";
                bul.style.marginTop = `${uz}px`
            } else {
            }
        }
    }
    /*  const remlist = (props) => {
         delindi(props)
             for (let i = 0; i < dizi.length; i++) {
               if (props === dizi[i]) {
                   indi.splice(i, 1);
                   Setma(ma - 1)//bu setma ne yapıyor bu indi ve dizistate olmadığı için bunlar değiştiğinde degerler guncelenmesi için boyle bir state tutum bunlar guncelelenince bunu değiştiriyorum
               } else {
   
               }
           }  
     }
     const font = (props) => {
         let gng = 0
         for (let i = 0; i < indi.length; i++) {
             if (props === indi[i].name) {
                 gng = 1; break;
             }
         }
 
         if (gng === 1) {
             return { height: "200" }
         } else {
             console.log("istenilen deger yok indi");
             return { height: "0", width: "0" }
         } 
     } */

    const delindi = (props) => {
        const element = document.getElementById(props)
        element.style.display = "none";
        /*      for (let i = (indi.length - 1); i >= 0; i--) { 
                 if (indi[i].name === props) { 
                     indi.splice(i, 1);
                     console.log("nesne silindi");
                     Setma(ma - 1)//burayı dinamik yap surekli değişenle çalışması içins
                     break;
                 }
             } */

        let a = indi.findIndex(el => el.name === props)
        if (a !== -1) {
            indi.splice(a, 1)
            Setma(ma - 1)
        }

    }
    const byt = () => {
        if (cnumber === 1) {
            Setcnumber(2)
        } else {
            Setcnumber(1)
        }
    }
    const esit = (props) => {
        let gel = props.toUpperCase()
        let sn = gel + "USDT"
        for (let i = 0; i < ssembol.length; i++) {
            if (sn === ssembol[i].name) {
                Setsembol(sn)
            }
        }
    };
    useEffect(() => { Setma(10) }, [])

    useEffect(() => {
        const chart = createChart(ref.current, { height: "300" });
        let candleSeries

        chart.applyOptions({
            watermark: {
                color: 'rgba(30, 0, 255, 0.4)',
                visible: true,
                text: 'Trader Club',
                fontSize: 50,
                horzAlign: 'center',
                vertAlign: 'center',
            }, priceScale: {
                position: 'right',
                borderVisible: false,
            },
            /* ,priceScale: { 
                scaleMargins: {
                  top: 0.3,
                  bottom: 0.25, 
                },
                borderVisible: false
              },
              layout: { 
                backgroundColor: "#131722",
                textColor: "#d1d4dc"
              },
              grid: {
                vertLines: {
                  color: "rgba(42, 46, 57, 0)"
                },
                horzLines: {
                  color: "rgba(42, 46, 57, 0.6)"
                }
              } */
        });

        const emafun = () => {
            const ema_series = chart.addLineSeries({ color: 'green', lineWidth: 1 });
            const a = async () => {
                var kleinData = await getData(sembol, interval);
                const ema_data = kleinData
                    .filter((d) => d.ema)
                    .map((d) => ({ time: d.time, value: d.ema }));
                ema_series.setData(ema_data);
            }; a();
        }

        const smafun = () => {
            const sma_series = chart.addLineSeries({ color: 'red', lineWidth: 1, pane: 1 });

            const a = async () => {
                var kleinData = await getData(sembol, interval);
                const sma_data = kleinData
                    .filter((d) => d.sma)
                    .map((d) => ({ time: d.time, value: d.sma }));
                sma_series.setData(sma_data);
            }; a();
        };

        const mark = async () => {
            var kleinData = await getData(sembol, interval);
            candleSeries.setMarkers(

                kleinData
                    .filter((d) => d.long || d.short)
                    .map((d) =>
                        d.long
                            ? {
                                time: d.time,
                                position: 'belowBar',
                                color: 'green',
                                shape: 'arrowUp',
                                text: 'LONG',
                            }
                            : {
                                time: d.time,
                                position: 'aboveBar',
                                color: 'red',
                                shape: 'arrowDown',
                                text: 'SHORT',
                            }
                    )
            )
        };
        let lin
        const linfun = async () => {
            lin = createChart(ref.current, { height: "200" })
            lin.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("lin()")
            const linreg_series = lin.addLineSeries({ color: 'blue', lineWidth: 1 });

            var kleinData = await getData(sembol, interval);
            const linreg_data = kleinData
                .filter((d) => d.linreg)
                .map((d) => ({ time: d.time, value: d.linreg }));
            linreg_series.setData(linreg_data);
            lin.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(linreg_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('lin').innerHTML = markup;
            }

        }
        let rsi
        const rsifun = async () => {
            rsi = createChart(ref.current, { height: "200" })
            rsi.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("rsi()");
            const rsiseries = rsi.addLineSeries({ color: 'purple', lineWidth: 1 });
            var kleinData = await getData(sembol, interval);
            const rsi_data = kleinData
                .filter((d) => d.rsi)
                .map((d) => ({ time: d.time, value: d.rsi, text: 'Rsi' }));
            rsiseries.setData(rsi_data);
            rsi.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(rsiseries).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('rsi').innerHTML = markup;
            }
        };
        let mac
        const macfun = async () => {
            mac = createChart(ref.current, { height: "200" })
            mac.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("mac()");
            var kleinData = await getData(sembol, interval);
            const macd_fast_series = mac.addLineSeries({
                color: 'blue',
                lineWidth: 1
            });
            const macd_fast_data = kleinData
                .filter((d) => d.macd_fast)
                .map((d) => ({ time: d.time, value: d.macd_fast }));
            macd_fast_series.setData(macd_fast_data);
            //MACD SLOW
            const macd_slow_series = mac.addLineSeries({
                color: 'red',
                lineWidth: 1,
            });
            const macd_slow_data = kleinData
                .filter((d) => d.macd_slow)
                .map((d) => ({ time: d.time, value: d.macd_slow }));
            macd_slow_series.setData(macd_slow_data);
            //MACD HISTOGRAM 
            const macd_histogram_series = mac.addHistogramSeries({});
            const macd_histogram_data = kleinData
                .filter((d) => d.macd_histogram)
                .map((d) => ({
                    time: d.time,
                    value: d.macd_histogram,
                    color: d.macd_histogram > 0 ? 'green' : 'red',
                }));
            macd_histogram_series.setData(macd_histogram_data);

            mac.subscribeCrosshairMove((p) => {
                const fast = p.seriesPrices.get(macd_fast_series).toFixed(5)
                const slow = p.seriesPrices.get(macd_slow_series).toFixed(5)
                const histo = p.seriesPrices.get(macd_histogram_series).toFixed(5)
                wrlin(fast, slow, histo);
            })
            var gf = 0; var gs = 0; var gh = 0
            function wrlin(f, s, h) {
                const markup = ` <p> Fast : ${f} | Slow : ${s}  | Histogram : ${h}</p>`;
                document.getElementById('mac').innerHTML = markup;
            }

        }
        let cmo
        const cmofun = async () => {
            cmo = createChart(ref.current, { height: "200" }/* font("cmo()") */)
            cmo.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("cmo()");
            var kleinData = await getData(sembol, interval);
            const cmo_series = cmo.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const cmo_data = kleinData
                .filter((d) => d.cmo)
                .map((d) => ({ time: d.time, value: d.cmo }));
            cmo_series.setData(cmo_data);
            cmo.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(cmo_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('cmo').innerHTML = markup;
            }
        }
        let hma
        const hmafun = async () => {
            hma = createChart(ref.current, { height: "200" })
            hma.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("hma()");
            var kleinData = await getData(sembol, interval);
            const hma_series = hma.addLineSeries({
                color: 'red',
                lineWidth: 1.5,
            });
            const hma_data = kleinData
                .filter((d) => d.hma)
                .map((d) => ({ time: d.time, value: d.hma }));
            hma_series.setData(hma_data);
            hma.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(hma_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('hma').innerHTML = markup;
            }
        }
        let fos
        const fosfun = async () => {
            fos = createChart(ref.current, { height: "200" })
            fos.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("fos()");
            var kleinData = await getData(sembol, interval);
            const Fosc_series = fos.addLineSeries({
                color: 'blue',
                lineWidth: 1.5,
            });
            const fosc_data = kleinData
                .filter((d) => d.fosc)
                .map((d) => ({ time: d.time, value: d.fosc }));
            Fosc_series.setData(fosc_data);
            fos.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(Fosc_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('fos').innerHTML = markup;
            }
        }
        let ede
        const edefun = async () => {
            ede = createChart(ref.current, { height: "200" })
            ede.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("ede()");
            var kleinData = await getData(sembol, interval);
            const edecay_series = ede.addLineSeries({
                color: '#20ecd9',
                lineWidth: 1.5,
            });
            const edecay_data = kleinData
                .filter((d) => d.edecay)
                .map((d) => ({ time: d.time, value: d.edecay }));
            edecay_series.setData(edecay_data);
            ede.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(edecay_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('ede').innerHTML = markup;
            }
        }
        let dpo
        const dpofun = async () => {
            dpo = createChart(ref.current, { height: "200" })
            dpo.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("dpo()");
            var kleinData = await getData(sembol, interval);
            const dpo_series = dpo.addLineSeries({
                color: 'green',
                lineWidth: 1,
            });
            const dpo_data = kleinData
                .filter((d) => d.dpo)
                .map((d) => ({ time: d.time, value: d.dpo }));
            dpo_series.setData(dpo_data);
            dpo.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(dpo_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('dpo').innerHTML = markup;
            }
        }
        let lis
        const lisfun = async () => {
            lis = createChart(ref.current, { height: "200" })
            lis.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("lis()");
            var kleinData = await getData(sembol, interval);
            const linregslope_series = lis.addLineSeries({
                color: 'green',
                lineWidth: 1.5,
            });
            const linregslope_data = kleinData
                .filter((d) => d.linregslope)
                .map((d) => ({ time: d.time, value: d.linregslope }));
            linregslope_series.setData(linregslope_data);
            lis.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(linregslope_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('lis').innerHTML = markup;
            }
        }
        let kam
        const kamfun = async () => {
            kam = createChart(ref.current, { height: "200" })
            kam.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("kam()");
            var kleinData = await getData(sembol, interval);
            const kama_series = kam.addLineSeries({ color: 'orange', lineWidth: 1, pane: 3 });
            const kama_data = kleinData
                .filter((d) => d.kama)
                .map((d) => ({ time: d.time, value: d.sma }));
            kama_series.setData(kama_data);
            kam.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(kama_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('kam').innerHTML = markup;
            }
        }
        let dem
        const demfun = async () => {
            dem = createChart(ref.current, { height: "200" })
            dem.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("dem()");
            var kleinData = await getData(sembol, interval);
            const dema_series = dem.addLineSeries({
                color: 'red',
                lineWidth: 1,
            });
            const dema_data = kleinData
                .filter((d) => d.dema)
                .map((d) => ({ time: d.time, value: d.dema }));
            dema_series.setData(dema_data);
            dem.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(dema_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('dem').innerHTML = markup;
            }
        }
        let lit
        const litfun = async () => {
            lit = createChart(ref.current, { height: "200" })
            lit.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("lit()");
            var kleinData = await getData(sembol, interval);
            const linregintercept_series = lit.addLineSeries({
                color: 'orange',
                lineWidth: 1.5,
            });
            const linregintercept_data = kleinData
                .filter((d) => d.linregintercept)
                .map((d) => ({ time: d.time, value: d.linregintercept }));
            linregintercept_series.setData(linregintercept_data);
            lit.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(linregintercept_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('lit').innerHTML = markup;
            }


        }
        let max
        const maxfun = async () => {
            max = createChart(ref.current, { height: "200" })
            max.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("max()");
            var kleinData = await getData(sembol, interval);
            const max_series = max.addLineSeries({
                color: 'blue',
                lineWidth: 1.5,
            });
            const max_data = kleinData
                .filter((d) => d.max)
                .map((d) => ({ time: d.time, value: d.max }));
            max_series.setData(max_data);
            max.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(max_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('max').innerHTML = markup;
            }
        }
        let mod
        const modfun = async () => {
            mod = createChart(ref.current, { height: "200" })
            mod.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("mod()");
            var kleinData = await getData(sembol, interval);
            const md_series = mod.addLineSeries({
                color: 'yellow',
                lineWidth: 1.5,
                pane: 12,
            });
            const md_data = kleinData
                .filter((d) => d.md)
                .map((d) => ({ time: d.time, value: d.md }));
            md_series.setData(md_data);
            mod.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(md_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('mod').innerHTML = markup;
            }
        }
        let min
        const minfun = async () => {
            min = createChart(ref.current, { height: "200" })
            min.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("min()");
            var kleinData = await getData(sembol, interval);
            const min_series = min.addLineSeries({
                color: 'red',
                lineWidth: 1.5,
                pane: 12,
            });
            const min_data = kleinData
                .filter((d) => d.min)
                .map((d) => ({ time: d.time, value: d.min }));
            min_series.setData(min_data);
            min.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(min_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('min').innerHTML = markup;
            }
        }
        let mom
        const momfun = async () => {
            mom = createChart(ref.current, { height: "200" })
            mom.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("mom()");
            var kleinData = await getData(sembol, interval);
            const mom_series = mom.addLineSeries({
                color: 'purple',
                lineWidth: 1.5,
            });
            const mom_data = kleinData
                .filter((d) => d.mom)
                .map((d) => ({ time: d.time, value: d.mom }));
            mom_series.setData(mom_data);
            mom.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(mom_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('mom').innerHTML = markup;
            }
        }
        let msw
        const mswfun = async () => {
            msw = createChart(ref.current, { height: "200" })
            msw.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("msw()");
            var kleinData = await getData(sembol, interval);
            const msw_series = msw.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const msw_data = kleinData
                .filter((d) => d.msw)
                .map((d) => ({ time: d.time, value: d.msw }));
            msw_series.setData(msw_data);
            msw.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(msw_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('msw').innerHTML = markup;
            }

        }
        let roc
        const rocfun = async () => {
            roc = createChart(ref.current, { height: "200" })
            roc.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("roc()");
            var kleinData = await getData(sembol, interval);
            const roc_series = roc.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const roc_data = kleinData
                .filter((d) => d.roc)
                .map((d) => ({ time: d.time, value: d.roc }));
            roc_series.setData(roc_data);
            roc.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(roc_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('roc').innerHTML = markup;
            }
        }
        let ror
        const rorfun = async () => {
            ror = createChart(ref.current, { height: "200" })
            ror.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("ror()");
            var kleinData = await getData(sembol, interval);
            const rocr_series = ror.addLineSeries({
                color: 'green',
                lineWidth: 1,
            });
            const rocr_data = kleinData
                .filter((d) => d.rocr)
                .map((d) => ({ time: d.time, value: d.rocr }));
            rocr_series.setData(rocr_data);
            ror.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(rocr_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('ror').innerHTML = markup;
            }
        }
        let std
        const stdfun = async () => {
            std = createChart(ref.current, { height: "200" })
            std.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("std()");
            var kleinData = await getData(sembol, interval);
            const stddev_series = std.addLineSeries({
                color: '#00FFFF',
                lineWidth: 1,
            });
            const stddev_data = kleinData
                .filter((d) => d.stddev)
                .map((d) => ({ time: d.time, value: d.stddev }));
            stddev_series.setData(stddev_data);
            std.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(stddev_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('std').innerHTML = markup;
            }

        }
        let sth
        const sthfun = async () => {
            sth = createChart(ref.current, { height: "200" })
            sth.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("sth()");
            var kleinData = await getData(sembol, interval);
            const stochrsi_series = sth.addLineSeries({
                color: '#6699FF',
                lineWidth: 1,
            });
            const stochrsi_data = kleinData
                .filter((d) => d.stochrsi)
                .map((d) => ({ time: d.time, value: d.stochrsi }));
            stochrsi_series.setData(stochrsi_data);
            sth.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(stochrsi_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('sth').innerHTML = markup;
            }
        }
        let sum
        const sumfun = async () => {
            sum = createChart(ref.current, { height: "200" })
            sum.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("sum()");
            var kleinData = await getData(sembol, interval);
            const sum_series = sum.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const sum_data = kleinData
                .filter((d) => d.sum)
                .map((d) => ({ time: d.time, value: d.sum }));
            sum_series.setData(sum_data);
            sum.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(sum_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('sum').innerHTML = markup;
            }
        }
        let tem
        const temfun = async () => {
            tem = createChart(ref.current, { height: "200" })
            tem.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("tem()");
            var kleinData = await getData(sembol, interval);
            const tema_series = tem.addLineSeries({
                color: '#53B5FF',
                lineWidth: 1,
            });
            const tema_data = kleinData
                .filter((d) => d.tema)
                .map((d) => ({ time: d.time, value: d.tema }));
            tema_series.setData(tema_data);
            tem.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(tema_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('tem').innerHTML = markup;
            }

        }
        let trm
        const trmfun = async () => {
            trm = createChart(ref.current, { height: "200" })
            trm.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("trm()");
            var kleinData = await getData(sembol, interval);
            const trima_series = trm.addLineSeries({
                color: '#158834',
                lineWidth: 1,
            });
            const trima_data = kleinData
                .filter((d) => d.trima)
                .map((d) => ({ time: d.time, value: d.trima }));
            trima_series.setData(trima_data);
            trm.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(trima_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('trm').innerHTML = markup;
            }
        }
        let trx
        const trxfun = async () => {
            trx = createChart(ref.current, { height: "200" })
            trx.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("trx()");
            var kleinData = await getData(sembol, interval);
            const trix_series = trx.addLineSeries({
                color: 'green',
                lineWidth: 1,
            });
            const trix_data = kleinData
                .filter((d) => d.trix)
                .map((d) => ({ time: d.time, value: d.trix }));
            trix_series.setData(trix_data);
            trx.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(trix_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('trx').innerHTML = markup;
            }
        }
        let tsf
        const tsffun = async () => {
            tsf = createChart(ref.current, { height: "200" })
            tsf.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("tsf()");
            var kleinData = await getData(sembol, interval);
            const tsf_series = tsf.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const tsf_data = kleinData
                .filter((d) => d.tsf)
                .map((d) => ({ time: d.time, value: d.tsf }));
            tsf_series.setData(tsf_data);
            tsf.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(tsf_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('tsf').innerHTML = markup;
            }
        }
        let vra
        const vrafun = async () => {
            vra = createChart(ref.current, { height: "200" })
            vra.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("vra()");
            var kleinData = await getData(sembol, interval);
            const var_series = vra.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const var_data = kleinData
                .filter((d) => d.var)
                .map((d) => ({ time: d.time, value: d.var }));
            var_series.setData(var_data);
            vra.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(var_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('vra').innerHTML = markup;
            }
        }
        let vhf
        const vhffun = async () => {
            vhf = createChart(ref.current, { height: "200" })
            vhf.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("vhf()");
            var kleinData = await getData(sembol, interval);
            const vhf_series = vhf.addLineSeries({
                color: '#FF0ED9',
                lineWidth: 1,
            });
            const vhf_data = kleinData
                .filter((d) => d.vhf)
                .map((d) => ({ time: d.time, value: d.vhf }));
            vhf_series.setData(vhf_data);
            vhf.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(vhf_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('vhf').innerHTML = markup;
            }
        }
        let vol
        const volfun = async () => {
            vol = createChart(ref.current, { height: "200" })
            vol.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("vol()");
            var kleinData = await getData(sembol, interval);
            const volatility_series = vol.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const volatility_data = kleinData
                .filter((d) => d.volatility)
                .map((d) => ({ time: d.time, value: d.volatility }));
            volatility_series.setData(volatility_data);
            vol.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(volatility_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('vol').innerHTML = markup;
            }
        }
        let wil
        const wilfun = async () => {
            wil = createChart(ref.current, { height: "200" })
            wil.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("wil()");
            var kleinData = await getData(sembol, interval);
            const wilders_series = wil.addLineSeries({
                color: 'blue',
                lineWidth: 1,
                pane: 5,
            });
            const wilders_data = kleinData
                .filter((d) => d.wilders)
                .map((d) => ({ time: d.time, value: d.wilders }));
            wilders_series.setData(wilders_data);
            wil.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(wilders_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('wil').innerHTML = markup;
            }
        }
        let wma
        const wmafun = async () => {
            wma = createChart(ref.current, { height: "200" })
            wma.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("wma()");
            var kleinData = await getData(sembol, interval);
            const wma_series = wma.addLineSeries({
                color: 'blue',
                lineWidth: 1,
            });
            const wma_data = kleinData
                .filter((d) => d.wma)
                .map((d) => ({ time: d.time, value: d.wma }));
            wma_series.setData(wma_data);
            wma.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(wma_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('wma').innerHTML = markup;
            }

        }
        let zle
        const zlefun = async () => {
            zle = createChart(ref.current, { height: "200" })
            zle.applyOptions({
                priceScale: {
                    position: 'right',
                    borderVisible: false,
                },
            })
            inlistfont("zle()");
            var kleinData = await getData(sembol, interval);
            const zlema_series = zle.addLineSeries({
                color: 'purple',
                lineWidth: 1,
            });
            const zlema_data = kleinData
                .filter((d) => d.zlema)
                .map((d) => ({ time: d.time, value: d.zlema }));
            zlema_series.setData(zlema_data);
            zle.subscribeCrosshairMove((p) => {
                const ohllin = p.seriesPrices.get(zlema_series).toFixed(6)
                wrlin(ohllin);
            })
            var gd = 0
            function wrlin(p) {
                if (typeof p === 'undefined') { g = gd } else { g = p; gd = g }
                const markup = ` <p> ${g} </p>`;
                document.getElementById('zle').innerHTML = markup;
            }

        }



        var _tpl = [];
        for (let index = 0; index < indi.length; index++) {
            var g = indi[index].name;
            var son = g.slice(0, 3)
            _tpl.push(son + "fun()")
        }
        for (var i = 0; i < _tpl.length; i++) { try { eval(_tpl[i]); } catch (error) { } }
        console.log("_tpl : " + _tpl);


        if (cnumber === 1) {
            candleSeries = chart.addBarSeries()
        } else {
            candleSeries = chart.addCandlestickSeries()
        }


        const a = async () => {
            var kleinData = await getData(sembol, interval);
            candleSeries.setData(kleinData);

            const socket = io('https://klineproxy.herokuapp.com/');
            socket.on(sembol, (pl) => {
                candleSeries.update(pl);
            });
            chart.subscribeCrosshairMove((param) => {
                const ohlc = param.seriesPrices.get(candleSeries)
                renderOHLC(ohlc);
            })
        }; a();

        const renderOHLC = (d) => {
            const { open, high, low, close } = d;
            const markup = `<pre>Symbol : ${sembol} Time : ${interval}</pre>
            <p>O :<span style={{ color:"${open > close ? 'red' : 'green'}" }}>${open} </span> H :<span > ${high}</span> L :<span >${low} </span> C :<span >${close} </span> </p>`;
            document.getElementById('ohlc').innerHTML = markup;
        };
        /* candlestickSeries.update(socket.io); */
        return () => {
            chart.remove();
            for (let i = 0; i < dizi.length; i++) {
                let get = dizi[i]; let sn = get.slice(0, 3);
                eval(sn + ".remove()")
            }
        }
    }, [sembol, interval, ma, cnumber])

    useEffect(() => {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=350&page=1&sparkline=false'
        axios.get(url).then((response) => {
            setCoins(response.data)
            /* console.log(response.data[0]) */
        }).catch((error) => {
            console.log(error)
        })


    }, [])

    const foto = () => {
        const screenshotTarget = document.body;
        html2canvas(screenshotTarget).then((canvas) => {
            const base64image = canvas.toDataURL("image/png");
            window.location.href = base64image;
        });
        /* html2canvas(document.body).then((canvas) => {
            let a = document.createElement("root");
            a.download = "ss.png";
            a.href = canvas.toDataURL("image/png");
            a.click();
            console.log("html2canvas calıştı");
        }); */
    }
    function searchpopup() {
        const searchinput = document.getElementById("inputa");
        try {
            searchinput.addEventListener("keyup", function () {
                let data = this.value.toUpperCase();
                let a = document.querySelectorAll("dir")
                for (let i = 0; i < a.length; i++) {
                    if (a[i].innerHTML.toUpperCase().indexOf(data) > -1) {
                        a[i].style.display = "";
                    } else {
                        a[i].style.display = "none";
                    }
                }
            })
        } catch (error) {

        }
    }; searchpopup();
    function searchpopupi() {
        const searchinput = document.getElementById("inputi");
        try {
            searchinput.addEventListener("keyup", function () {
                let data = this.value.toUpperCase();
                let a = document.querySelectorAll("dir")
                for (let i = 0; i < a.length; i++) {
                    if (a[i].innerHTML.toUpperCase().indexOf(data) > -1) {
                        a[i].style.display = "";
                    } else {
                        a[i].style.display = "none";
                    }
                }
            })
        } catch (error) {

        }
    }; searchpopupi();

    return (
        <div>
            <div className="slide" style={{ display: slide ? "block" : "none" }} onClick={() => { Setslide(false) }}>
                <div className="inslide">
                   
                    <Link to="/">   <img src={home} alt="" className="imgslide" /></Link>
                    <Link to="/watch"> <img src={watch} alt="" className="imgslide"  /></Link> 
                    <Link to="/vector"> <img src={vetor} alt="" className="imgslide" /></Link> 
                    <Link to="/chat">  <img src={chat} alt="" className="imgslide" /></Link>
                    <img src={setting} alt="" className="imgslide" />
                    <img src={exit} alt="" className="imgslide"  style={{width:"50px",height:"30px",marginTop:"200px"}}/>
                </div>
            </div>

            <div className="wmenu">
                <div className="icdiv" onClick={() => { Setslide(true) }} style={{ float: "left" }} id="bas"><img src={mntrd} alt="Foto" className="img" style={{ width: "35px", height: "35px" }} /></div>
                <div className="icdiv" onClick={() => { setShowsembol(true) }} style={{ marginLeft: "-2%" }} >{sembol}</div>|
                <div className="icdiv" onClick={() => { setShowtime(true) }} style={{ float: "left" }}>{interval}</div>|
                <div className="icdiv" onClick={() => { Setintervall("1h") }} style={{ float: "left" }}>1s</div>
                <div className="icdiv" onClick={() => { Setintervall("2h") }} style={{ float: "left" }}>2s</div>
                <div className="icdiv" onClick={() => { Setintervall("4h") }} style={{ float: "left" }}>4s</div> |
                <div className="icdiv" onClick={() => { setShowindi(true) }} style={{ float: "left" }}><img src={indiimg} className="img" alt="Indikaotr" style={{ width: "40px", height: "36px" }} /></div> |
                <div className="icdiv" onClick={() => { byt() }} style={{ float: "left" }}><img src={candle} alt="Foto" className="img" style={{ width: "40px", height: "40px" }} /></div>|
                <div className="icdiv" onClick={() => { foto() }} style={{ float: "left" }}><img src={fotoimg} alt="Foto" className="img" style={{ width: "40px", height: "40px" }} /></div>

                <div className="icdiv" style={{ float: "left", marginLeft: "20%" }}><img src={bin} alt="Foto" className="img" style={{ width: "150px", height: "30px", marginTop: "5px" }} /></div>
            </div>

            <div className="kapsultime" style={{ display: showtime ? "block" : "none" }}>
                <div className="sabit" >
                    <div className="scrol">
                        <div id="kapsulkapattime" onClick={() => { setShowtime(false) }}>X</div>
                        <h2>Time List </h2>
                    </div>
                    <form id="form">
                        <div className="martime"  > </div>
                        {
                            timeIntervals.map(({ name, text }) => (<div className="indidiv"><a key={name.text} onClick={() => { setShowtime(false); Setintervall(name) }}><img src={star} alt="Foto" style={{ width: "15px", height: "15px" }} />{text}</a></div>))
                        }
                    </form>
                </div>
            </div>

            <div className="kapsulsembol" style={{ display: showsembol ? "block" : "none" }}>
                <div className="sabit">
                    <div className="scrol">
                        <div id="kapsulkapatsembol" onClick={() => { setShowsembol(false) }}>X</div>
                        <h3 className="search">Cyrpto List </h3>
                        <input id="inputa" type="text" className="search" />
                    </div>
                    <form id='form'>
                        {
                            ssembol.map(({ name, text }) => (<dir className="indidiv"><a key={name.name} onClick={() => { setShowsembol(false); Setsembol(name) }}><img src={star} alt="Foto" style={{ width: "15px", height: "15px" }} />{text}</a></dir>))
                        }

                    </form>
                </div>
            </div >

            <div className="kapsulindi" style={{ display: showindi ? "block" : "none" }}>
                <div className="sabit">
                    <div className="scrol">
                        <div id="kapsulkapatindi" onClick={() => { setShowindi(false) }}>X</div>
                        <h3 className="search">indikator List </h3>
                        <input id="inputi" type="text" className="search" />
                    </div>
                    <form id='form'>
                        <div className="martop" > </div>
                        {
                            indilist.map(({ name, text }) => (<dir className="indidiv" id="diva"><a key={name.name} className="india" onClick={() => { addindi(name); setShowindi(false); }}><img src={star} alt="Foto" style={{ width: "15px", height: "15px" }} />{text}</a></dir>))
                        }
                    </form>
                </div>

            </div>

            <div ref={ref} id="ref">
                <h2 className="h2" id="ohlc">
                    <pre></pre><p>O<span className="green" style={{ color: "black" }}>0</span> H<span className="green" style={{ color: "black" }}>0</span> L<span className="green" style={{ color: "black" }}>0</span> C<span className="green" style={{ color: "black" }}>0</span> </p></h2>
                <div id="rsi()" className="ab"> <pre>RSİ     </pre><p id="rsi" className="pb"></p>  <img src={kpt} onClick={() => { delindi("rsi()") }} alt="Foto" className="x" /></div>
                <div id="lin()" className="ab"> <pre>LINREG  </pre><p id="lin" className="pb"></p><img src={kpt} onClick={() => { delindi("lin()") }} alt="Foto" className="x" /></div>
                <div id="cmo()" className="ab"> <pre>CMO     </pre><p id="cmo" className="pb"></p><img src={kpt} onClick={() => { delindi("cmo()") }} alt="Foto" className="x" /></div>
                <div id="hma()" className="ab"> <pre>HMA     </pre><p id="hma" className="pb"></p><img src={kpt} onClick={() => { delindi("hma()") }} alt="Foto" className="x" /></div>
                <div id="ede()" className="ab"> <pre>EDECAY  </pre><p id="ede" className="pb"></p><img src={kpt} onClick={() => { delindi("ede()") }} alt="Foto" className="x" /></div>
                <div id="lis()" className="ab"> <pre>LINREG S</pre><p id="lis" className="pb"></p><img src={kpt} onClick={() => { delindi("lis()") }} alt="Foto" className="x" /></div>
                <div id="dpo()" className="ab"> <pre>DPO     </pre><p id="dpo" className="pb"></p><img src={kpt} onClick={() => { delindi("dpo()") }} alt="Foto" className="x" /></div>
                <div id="max()" className="ab"> <pre>MAX     </pre><p id="max" className="pb"></p><img src={kpt} onClick={() => { delindi("max()") }} alt="Foto" className="x" /></div>
                <div id="mod()" className="ab"> <pre>MD      </pre><p id="mod" className="pb"></p><img src={kpt} onClick={() => { delindi("mod()") }} alt="Foto" className="x" /></div>
                <div id="min()" className="ab"> <pre>MIN     </pre><p id="min" className="pb"></p><img src={kpt} onClick={() => { delindi("min()") }} alt="Foto" className="x" /></div>
                <div id="mom()" className="ab"> <pre>MOM     </pre><p id="mom" className="pb"></p><img src={kpt} onClick={() => { delindi("mom()") }} alt="Foto" className="x" /></div>
                <div id="msw()" className="ab"> <pre>MSW     </pre><p id="msw" className="pb"></p><img src={kpt} onClick={() => { delindi("msw()") }} alt="Foto" className="x" /></div>
                <div id="roc()" className="ab"> <pre>ROC     </pre><p id="roc" className="pb"></p><img src={kpt} onClick={() => { delindi("roc()") }} alt="Foto" className="x" /></div>
                <div id="ror()" className="ab"> <pre>ROCR    </pre><p id="ror" className="pb"></p><img src={kpt} onClick={() => { delindi("ror()") }} alt="Foto" className="x" /></div>
                <div id="std()" className="ab"> <pre>STDDEV  </pre><p id="std" className="pb"></p><img src={kpt} onClick={() => { delindi("std()") }} alt="Foto" className="x" /></div>
                <div id="sth()" className="ab"> <pre>STOCHRSI</pre><p id="sth" className="pb"></p><img src={kpt} onClick={() => { delindi("sth()") }} alt="Foto" className="x" /></div>
                <div id="sum()" className="ab"> <pre>SUM     </pre><p id="sum" className="pb"></p><img src={kpt} onClick={() => { delindi("sum()") }} alt="Foto" className="x" /></div>
                <div id="tem()" className="ab"> <pre>TEMA    </pre><p id="tem" className="pb"></p><img src={kpt} onClick={() => { delindi("tem()") }} alt="Foto" className="x" /></div>
                <div id="trm()" className="ab"> <pre>TRIMA   </pre><p id="trm" className="pb"></p><img src={kpt} onClick={() => { delindi("trm()") }} alt="Foto" className="x" /></div>
                <div id="trx()" className="ab"> <pre>TRIX    </pre><p id="trx" className="pb"></p><img src={kpt} onClick={() => { delindi("trx()") }} alt="Foto" className="x" /></div>
                <div id="tsf()" className="ab"> <pre>TSF     </pre><p id="tsf" className="pb"></p><img src={kpt} onClick={() => { delindi("tsf()") }} alt="Foto" className="x" /></div>
                <div id="vra()" className="ab"> <pre>VAR     </pre><p id="vra" className="pb"></p><img src={kpt} onClick={() => { delindi("vra()") }} alt="Foto" className="x" /></div>
                <div id="vhf()" className="ab"> <pre>VHF     </pre><p id="vhf" className="pb"></p><img src={kpt} onClick={() => { delindi("vhf()") }} alt="Foto" className="x" /></div>
                <div id="vol()" className="ab"> <pre>AHV     </pre><p id="vol" className="pb"></p><img src={kpt} onClick={() => { delindi("vol()") }} alt="Foto" className="x" /></div>
                <div id="wil()" className="ab"> <pre>WILDERS </pre><p id="wil" className="pb"></p><img src={kpt} onClick={() => { delindi("wil()") }} alt="Foto" className="x" /></div>
                <div id="wma()" className="ab"> <pre>WMA     </pre><p id="wma" className="pb"></p><img src={kpt} onClick={() => { delindi("wma()") }} alt="Foto" className="x" /></div>
                <div id="zle()" className="ab"> <pre>ZLEMA   </pre><p id="zle" className="pb"></p><img src={kpt} onClick={() => { delindi("zle()") }} alt="Foto" className="x" /></div>

                <div id="fos()" className="ab"> <pre>FOSC    </pre><p id="fos" className="pb"></p><img src={kpt} onClick={() => { delindi("fos()") }} alt="Foto" className="x" /></div>
                <div id="kam()" className="ab"> <pre>KAMA    </pre><p id="kam" className="pb"></p><img src={kpt} onClick={() => { delindi("kam()") }} alt="Foto" className="x" /></div>
                <div id="dem()" className="ab"> <pre>DEMA    </pre><p id="dem" className="pb"></p><img src={kpt} onClick={() => { delindi("dem()") }} alt="Foto" className="x" /></div>
                <div id="lit()" className="ab"> <pre>LINREG I</pre><p id="lit" className="pb"></p><img src={kpt} onClick={() => { delindi("lit()") }} alt="Foto" className="x" /></div>

                <div id="mac()" className="ab"> <pre>MACD    </pre><p id="mac" style={{ color: "black", fontSize: "x-large" }}></p><img src={kpt} onClick={() => { delindi("mac()") }} alt="Foto" className="x" /></div>
            </div>
            <div className="klp" /* style={{ display: showWtcls ? "block" : "none" }} */ >
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                </div>
                <div className="ap" >
                    {coins.map(coins => {
                        return (
                            <>
                                <div className='coin-row' onClick={() => { esit(coins.symbol)  /* console.log(coins.symbol) */ }}>
                                    <p>{coins.market_cap_rank}</p>
                                    <div className='img-symbol'>
                                        <img src={coins.image} alt='' />
                                        <p>{coins.symbol.toUpperCase()}</p>
                                    </div>
                                    <p>${coins.current_price.toLocaleString()}</p>
                                    <p style={{
                                        color: `${0 > coins.price_change_percentage_24h ? 'red' : 'rgb(30, 199, 47)'}`
                                    }}>{coins.price_change_percentage_24h.toFixed(2)}%</p>

                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Dene 