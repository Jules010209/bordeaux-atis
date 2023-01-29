import { Injectable, BadRequestException } from '@nestjs/common';
import { Axios } from 'axios';
import * as airac from './airac.json';
import { address } from 'ip';

const axios = new Axios({ baseURL: `http://${address('public', 'ipv4')}:${process.env.PORT}` });
const fbw_api = "https://api.flybywiresim.com";

@Injectable()
export class AppService {
    async atis(icao: any, res: any, req: any) {
        // let metar_infos = await axios.get(`${fbw_api}/metar/${icao}?source=ms`).then(resp => resp.data);
        return axios.get(`https://avwx.rest/api/metar/${icao}`, {
            headers: {
                Authorization: `Bearer ${process.env.KEY}`
            }
        }).then((resp) => {
            return res.send(JSON.parse(resp['data']));
        });
        
        // let result = metar_json.match("(?<icao>(?:^[a-zA-Z]..[a-zA-Z]))(?:_(?<wing>(?:$..)))?");

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
