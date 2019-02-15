import * as fs from 'fs'
import * as readline from 'readline'

let dictionary:object = {};

fs.readdirSync('./files').forEach(file => {
    if( file.endsWith(".log") ){
        readline.createInterface({
            input : fs.createReadStream(`./files/${file}`)
        }).on('line', line => {
            if( line.includes('[com.github.stove99.module.mapper.SampleMapper.selectSample] ==> Parameters:') ){
                var tmp = line.substr(118).split(", ");
        
                if( tmp.length==2 ){
                    dictionary[tmp[0].replace('(String)', '')] = tmp[1].replace('(String)', '');
                }
            }
        }).on('close', function(){
            let wstream = fs.createWriteStream('list.csv');
        
            wstream.once('open', function(){
                Object.keys(dictionary).forEach(key=>{
                    wstream.write(`${key},${dictionary[key]}\n`);
                });
        
                wstream.end();
            });
        });
    }
});