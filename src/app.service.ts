import { Injectable, BadRequestException } from '@nestjs/common';
import { Axios } from 'axios';
import * as airac from './airac.json';
import { address } from 'ip';

const axios = new Axios({ baseURL: `http://${address('public', 'ipv4')}:${process.env.PORT}` });

@Injectable()
export class AppService {
    async atis(icao: string, res: any, req: any) {
        if (
            icao.toUpperCase() === 'LFBD' ||
            icao.toUpperCase() === 'LFBE' ||
            icao.toUpperCase() === 'LFBH'
        ) {
            // let metar_infos = await axios.get(`${fbw_api}/metar/${icao}?source=ms`).then(resp => resp.data);
            return axios.get(`https://avwx.rest/api/metar/${icao.toUpperCase()}`, {
                headers: {
                    Authorization: `Bearer ${process.env.KEY}`
                }
            }).then((resp) => {
                let data = JSON.parse(resp['data']);

                let airport_runways = airac[icao.toUpperCase()].runways;
                
                let wind_direction = data?.wind_direction.value;
                let wind_speed = data?.wind_speed.value;

                let runways_score: { qfu_runway: string, score: number } [] = [];

                for(const qfu_runway of airport_runways) {
                    let front_wind: number = wind_speed * Math.cos((wind_direction - qfu_runway) * Math.PI / 180);
                    let side_wind: number = wind_speed * Math.sin((wind_direction - qfu_runway) * Math.PI / 180);

                    let runway_score: number = (front_wind - Math.abs(side_wind));

                    runways_score.push({ qfu_runway: qfu_runway, score: runway_score });
                }

                runways_score.sort((a, b) => b.score - a.score);

                let runway_in_use: number = airac[icao.toUpperCase()].solved_runways[runways_score[0].qfu_runway];

                let response_json = {
                    runway_in_use: runway_in_use,
                    sid: airac[icao.toUpperCase()].sid[runway_in_use],
                    star: airac[icao.toUpperCase()].star[runway_in_use] ?? airac[icao.toUpperCase()].star
                }

                return res.status(200).json(response_json).end();
            });
        } else {
            throw new BadRequestException();
        }
    }

    async data(res: any) {
        // const file = createReadStream(join(process.cwd(), '/src/sid.json'));

        // return file.pipe(res);
        return res.status(200).send(airac).end();
    }

    async infos(icao: string, res: any) {
        return res.status(200).send(airac[icao.toUpperCase()]).end();
    }

    async sid(icao: string, res: any) {
        if (
            icao.toUpperCase() === 'LFBD' ||
            icao.toUpperCase() === 'LFBE' ||
            icao.toUpperCase() === 'LFBH'
        ) {
            return res.status(200).send(airac[icao.toUpperCase()].sid).end();
        } else {
            throw new BadRequestException();
        }
    }

    async star(icao: string, res: any) {
        if (
            icao.toUpperCase() === 'LFBD' ||
            icao.toUpperCase() === 'LFBE' ||
            icao.toUpperCase() === 'LFBH'
        ) {
            return res.status(200).send(airac[icao.toUpperCase()].star).end();
        } else {
            throw new BadRequestException();
        }
    }
}
