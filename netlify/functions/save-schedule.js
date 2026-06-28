const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_PATH = path.resolve(__dirname, '../../data/schedule.json');
function sha256(text){ return crypto.createHash('sha256').update(String(text || '')).digest('hex'); }
function cors(){ return {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET,POST,OPTIONS'}; }
function readData(){ if(!fs.existsSync(DATA_PATH)) return {adminPasswordHash:'', data:{}}; return JSON.parse(fs.readFileSync(DATA_PATH,'utf8')); }
function writeData(obj){ fs.mkdirSync(path.dirname(DATA_PATH), {recursive:true}); fs.writeFileSync(DATA_PATH, JSON.stringify(obj,null,2), 'utf8'); }

exports.handler = async function(event){
  try{
    if(event.httpMethod === 'OPTIONS') return {statusCode:204, headers:cors(), body:''};
    if(event.httpMethod === 'GET') return {statusCode:200, headers:cors(), body:JSON.stringify(readData())};
    if(event.httpMethod !== 'POST') return {statusCode:405, headers:cors(), body:JSON.stringify({error:'Method Not Allowed'})};
    const body = JSON.parse(event.body || '{}');
    const password = String(body.password || '');
    const newPassword = String(body.newPassword || '');
    const current = readData();
    if(!password) return {statusCode:401, headers:cors(), body:JSON.stringify({error:'비밀번호를 입력하세요'})};
    if(current.adminPasswordHash && sha256(password) !== current.adminPasswordHash){
      return {statusCode:403, headers:cors(), body:JSON.stringify({error:'비밀번호가 틀렸습니다'})};
    }
    const next = {
      adminPasswordHash: newPassword ? sha256(newPassword) : (current.adminPasswordHash || sha256(password)),
      data: body.data || current.data || {}
    };
    writeData(next);
    return {statusCode:200, headers:cors(), body:JSON.stringify({ok:true, adminPasswordHash:next.adminPasswordHash})};
  }catch(e){
    return {statusCode:500, headers:cors(), body:JSON.stringify({error:e.message || '서버 오류'})};
  }
};
