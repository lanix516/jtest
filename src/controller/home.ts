import { Controller, Get } from '@midwayjs/decorator';
// import axios from 'axios';
import * as cheerio from "cheerio";
import * as https from "https";

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    // let { data } = await axios.get("http://www.baidu.com/");
    // let body = cheerio.load(data);
    // return body('div #lg').children('img').attr("src")
    const d = new Promise((resolve, reject)=>{
      let data:string = '';
      https.get("https://www.baidu.com", res=>{
        res.on("data", d=>{
          data += d;
        })
        res.on("end", ()=>{
          resolve(data)
        })
      })
    })
    let result= await d;
    let body = cheerio.load(result as string);
    
    return body('div #lg').children('img').attr("src")
  }
}
