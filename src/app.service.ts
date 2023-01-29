import { Injectable, BadRequestException } from '@nestjs/common';
import { Axios } from 'axios';
import * as airac from './airac.json';
import { address } from 'ip';

const axios = new Axios({ baseURL: `http://${address('public', 'ipv4')}:${process.env.PORT}` });
const infos_api = "https://api.flybywiresim.com";

@Injectable()
export class AppService {
    async atis(icao: any, res: any, req: any) {
        // return axios.get(`http://${address('public', 'ipv4')}:${process.env.PORT}/data`).then(response => {
        //     return res.send(JSON.parse(response.data));
        // });

        let metar_infos = await axios.get(`${infos_api}/metar/${icao}?source=ms`).then(resp => JSON.parse(resp.data));
        
        let metar_json = metar_infos['metar'];
        
        let regex: RegExp = /^LFBD 291530Z AUTO [0-9]+KT 340V080 9999 BKN035 06\/M02 Q1029 NOSIG$/i;
        let result = regex.test(metar_json);

        // airac[icao].sid['05']
        return res.send(result);
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
