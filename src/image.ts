import Axios from 'axios';
import qs from 'qs';
import Fs from 'fs';
export async function generateImage(
  graph: string,
  imagePath: string,
): Promise<void> {
  const writer = Fs.createWriteStream(imagePath);

  const data = qs.stringify({
    chl: graph,
    cht: 'gv',
  });
  const response = await Axios({
    url: 'https://image-charts.com/chart',
    method: 'POST',
    responseType: 'stream',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
