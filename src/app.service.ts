import { Injectable, BadRequestException } from '@nestjs/common';
import { Axios } from 'axios';
import * as airac from './airac.json';
import { address } from 'ip';

const axios = new Axios({ baseURL: `http://${address('public', 'ipv4')}:${process.env.PORT}` });
const fbw_api = "https://api.flybywiresim.com";

@Injectable()
export class AppService {
    async atis(icao: string, res: any, req: any) {
        // let metar_infos = await axios.get(`${fbw_api}/metar/${icao}?source=ms`).then(resp => resp.data);
        return axios.get(`https://avwx.rest/api/metar/${icao.toUpperCase()}`, {
            headers: {
                Authorization: `Bearer ${process.env.KEY}`
            }
        }).then((resp) => {
            let data = JSON.parse(resp['data']);
            let airport_departures = airac[icao.toUpperCase()].sid;
            let airport_arivals = airac[icao.toUpperCase()].star;

            let airport_runways = airac[icao.toUpperCase()].runways;
        
            let wind = data?.wind_direction.value;

            let qfe_func = (temperature: number, qnh: number, altitude: number) => {
                var T0: any = temperature + 273.15;
                
                var qfe: number = 1013.25 * Math.pow(Math.pow((qnh / 1013.25), 0.190263189) + ((altitude * -0.0065) / T0), 5.255877432);
                
                return Number(Math.round(qfe + 'e1') + 'e-1');
            }

            let qfe = qfe_func(data?.temperature.value, data?.altimeter.value, airac[icao.toUpperCase()].altitude);

            return res.send(String(qfe));
        });
        
        // let result = metar_json.match("(?<icao>(?:^[a-zA-Z]..[a-zA-Z]))(?:_(?<wind>(?:$..)))?");

        // airac[icao].sid['05']
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
