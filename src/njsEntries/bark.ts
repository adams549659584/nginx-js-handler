import { formatDate } from '../utils/utils';
import fs from 'fs';
import { IBarkMsg } from '../model/IBarkMsg';
import { IBarkRes } from '../model/IBarkRes';

async function handleMarkdown(r: NginxHTTPRequest) {
  r.log(`r : ${JSON.stringify(r)}`);
  const errBarkRes: IBarkRes = {
    code: 400,
    message: 'Bad Request',
    timestamp: Date.now(),
  };
  if (!r.requestText) {
    errBarkRes.message = 'Please Use API V2 !';
    return r.return(400, JSON.stringify(errBarkRes));
  }
  const barkMsg: IBarkMsg = JSON.parse(r.requestText);
  if (!barkMsg.device_key) {
    errBarkRes.message = 'device_key is required !';
    return r.return(400, JSON.stringify(errBarkRes));
  }
  if (barkMsg.markdown) {
    const dateNow = new Date();
    const fileName = `${formatDate(dateNow, 'yyyyMMddHHmmssfff')}${Math.round(Math.random() * 100000)
      .toString()
      .padEnd(5, '0')}`;
    const savePath = `/usr/share/nginx/html/bark/data/${fileName}.md`;
    fs.writeFileSync(savePath, barkMsg.markdown);
    barkMsg.url = `https://${r.headersIn['Host']}/msg?id=${fileName}`;
    delete barkMsg.markdown;
  }
  const pushRes = await r.subrequest('/push', {
    method: 'POST',
    body: JSON.stringify(barkMsg),
  });
  r.return(pushRes.status, pushRes.responseText);
}

export default { handleMarkdown };
